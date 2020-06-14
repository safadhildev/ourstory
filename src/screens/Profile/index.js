import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import styles from './styles';
import Input from '../../components/Input';
import {color} from 'react-native-reanimated';
import Color from '../../components/Color';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const userIcon = require('../../../assets/icons/round_account_circle_black_48dp.png');

const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};
const Profile = ({route}) => {
  const navigation = useNavigation();
  const {param: data} = route.params;
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureData, setProfilePictureData] = useState(null);
  const [loading, setLoading] = useState(false);
  const onGoBack = () => {
    navigation.goBack();
  };

  const getUser = (snapshot) => {
    console.log({snapshot});

    if (snapshot.exists) {
      const {name, image} = snapshot.data();
      setUser(snapshot.data());
      setName(name);
      setProfilePicture(image);
      setUsername(snapshot.id);
    }
  };

  const onUpdate = async () => {
    setLoading(true);
    console.log({username});

    const updateUser = firestore().collection('users').doc(username);
    let imageUrl = profilePicture;
    if (profilePictureData) {
      const localUrl = profilePicture.replace('file://', '');
      const storageRef = storage().ref(
        `/users/${data.id}/thumbnail/${profilePictureData.fileName}`,
      );

      await storageRef.putFile(localUrl);

      imageUrl = await storageRef.getDownloadURL();
    }
    await updateUser
      .update({
        name,
        image: imageUrl,
      })
      .then(() => {
        console.log('updated');
        setLoading(false);
        onGoBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const selectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const {fileName, height, width} = response;
        console.log({fileName});

        console.log({source});
        const uri = source.uri.replace('file://', '');

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        setProfilePictureData({fileName, uri: source.uri});
        setProfilePicture(source.uri);
      }
    });
  };
  useEffect(() => {
    const ref = firestore().collection('users').doc(data.id);
    const subs = ref.onSnapshot((snapshot) => {
      getUser(snapshot);
    });

    return () => subs;
  }, []);

  console.log({profilePicture});

  return (
    <ScrollView style={{flex: 1, backgroundColor: Color.white}}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Header onPress={() => onGoBack()} />
          <View>
            <View
              style={{
                width: 200,
                height: 200,
                backgroundColor: Color.lightGrey,
                borderRadius: 200,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                overflow: 'hidden',
              }}>
              <Image
                source={profilePicture ? {uri: profilePicture} : userIcon}
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                selectImage();
              }}>
              <View
                style={{
                  backgroundColor: Color.blue,
                  width: 130,
                  alignSelf: 'center',
                  padding: 5,
                  borderRadius: 8,
                  margin: 10,
                }}>
                <Text style={{color: Color.white, textAlign: 'center'}}>
                  Change photo
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{alignItems: 'center', marginVertical: 50}}>
              <Text>@{username}</Text>
              <View style={{width: 300}}>
                <Input
                  value={name}
                  center
                  onChangeText={(text) => {
                    setName(text);
                  }}
                  bold
                />
              </View>
              <Button
                text={loading ? 'Updating...' : 'Update'}
                onPress={() => {
                  onUpdate();
                }}
                disabled={loading ? true : false}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Profile;
