import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Color from '../../components/Color';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import Button from '../../components/Button';

const back = require('../../../assets/icons/back.png');
const cancel = require('../../../assets/icons/criss-cross.png');
const placeholderImage = require('../../../assets/image/placeholder-image.png');

const ref = firestore().collection('stories');

const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};
const StoryEdit = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [components, setComponents] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
  };

  const onChange = (type, text) => {
    switch (type) {
      case 'title':
        setTitle(text);
        break;
      case 'content':
        setContent(text);
        break;
      default:
        break;
    }
  };
  const selectImage = (type) => {
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

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        if (type === 'thumbnail') {
          setThumbnail({
            fileName,
            height,
            width,
            source,
          });
        }
      }
    });
  };

  const addComponent = () => {
    setComponents([...components, <Button />]);
  };

  const onRemoveThumbnail = () => {
    setThumbnail(null);
  };

  const onSubmit = async () => {
    await ref
      .add({title, content})
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onValidate = () => {
    if (title) {
      onSubmit();
    } else {
      Alert('Error', "Title can't be empty");
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: Color.white}}>
      <KeyboardAvoidingView>
        <Header
          onPress={() => {
            onBack();
          }}
        />
        {/* {components && components} */}
        <View>
          <TouchableOpacity
            style={{margin: 20, overflow: 'hidden'}}
            onPress={() => selectImage('thumbnail')}>
            <View
              style={{
                width: '100%',
                height: 200,
                borderStyle: 'dotted',
                borderColor: '#eee',
                borderWidth: 3,
                borderRadius: 1,
              }}>
              <Image
                source={thumbnail ? thumbnail.source : placeholderImage}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
              {!thumbnail && (
                <Text
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: 200,
                    opacity: 0.4,
                  }}>
                  Add Image
                </Text>
              )}
              {thumbnail && (
                <TouchableOpacity
                  onPress={() => {
                    onRemoveThumbnail();
                  }}
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                    }}>
                    <Image
                      source={cancel}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <Input
          value={title}
          onChangeText={(text) => onChange('title', text)}
          placeholder="Title"
        />
        <Input
          value={content}
          onChangeText={(text) => onChange('content', text)}
          placeholder="Say somthing ..."
          multiline={true}
        />
        <View
          style={{
            margin: 20,
            alignItems: 'flex-end',
          }}>
          <Button
            text="Add"
            onPress={() => {
              onValidate();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StoryEdit;
