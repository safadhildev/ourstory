import React, {useState, useEffect} from 'react';
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
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Color from '../../components/Color';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import Button from '../../components/Button';
import {set} from 'react-native-reanimated';

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

const StoryEdit = ({route}) => {
  const [newStory, setNewStory] = useState({
    title: null,
    content: null,
    thumbnail: null,
    uploader: null,
  });
  const [story, setStory] = useState({
    id: null,
    title: null,
    content: null,
    thumbnail: null,
    uploader: null,
  });
  const [loading, setLoading] = useState(false);
  const [components, setComponents] = useState([]);
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [storyThumbnail, setStoryThumbnail] = useState(null);

  const getUser = async () => {
    try {
      const id = await AsyncStorage.getItem('username');
      setUsername(id);
    } catch (e) {
      // read error
    }
  };

  const checkParams = () => {
    let id = null;
    if (route.params) {
      setEditMode(true);
      id = route.params.id;

      const {title, content, thumbnail} = route.params.data;
      setNewStory({title, content, thumbnail});
      setStory({id, title, thumbnail, content});
      setEditMode(true);
    }
  };

  const onChange = (type, text) => {
    switch (type) {
      case 'title':
        setNewStory({
          ...newStory,
          title: text,
        });
        break;
      case 'content':
        setNewStory({
          ...newStory,
          content: text,
        });
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

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        if (type === 'thumbnail') {
          setNewStory({
            ...newStory,
            thumbnail: {fileName, height, width, uri: source.uri},
          });
        }
      }
    });
  };

  const addComponent = () => {
    setComponents([...components, <Button />]);
  };

  const onRemoveThumbnail = () => {
    Alert.alert(
      'Alert',
      'Remove Image?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setNewStory({
              ...newStory,
              thumbnail: null,
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onGoBack = () => {
    const {title, thumbnail, content} = story;
    const newThumbnailType = typeof newStory.thumbnail;
    console.log(newThumbnailType);

    if (
      title !== newStory.title ||
      content !== newStory.content ||
      (thumbnail === null && newStory.thumbnail !== null) ||
      (thumbnail !== null && newStory.thumbnail === null) ||
      (typeof thumbnail === 'string' && newThumbnailType === 'object')
    ) {
      Alert.alert(
        'Discard All Changes?',
        'You have unsaved changes that will be lost',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              onConfirmBack();
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      onConfirmBack();
    }
  };

  const onConfirmBack = () => {
    setNewStory({
      title: null,
      content: null,
      thumbnail: null,
      uploader: null,
    });
    setStory({
      id: null,
      title: null,
      content: null,
      thumbnail: null,
      uploader: null,
    });
    navigation.goBack();
  };

  const onSubmit = async () => {
    const key = moment().unix().toString();
    const date = moment().format('LLLL');
    let thumbnailUrl = null;

    const {title, content, thumbnail} = newStory;

    if (thumbnail) {
      const localUrl = thumbnail.uri.replace('file://', '');
      const storageRef = storage().ref(
        `/stories/${key}/thumbnail/${thumbnail.fileName}`,
      );

      await storageRef.putFile(localUrl);

      thumbnailUrl = await storageRef.getDownloadURL();
    }
    await ref
      .doc(key)
      .set({
        title,
        content,
        date,
        thumbnail: thumbnailUrl,
        comments: [],
        uploader: username,
      })
      .then(() => {
        console.log('success');
        setLoading(false);
        onConfirmBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEditSubmit = async () => {
    const date = moment().format('LLLL');
    const {title, thumbnail, content} = newStory;
    let thumbnailUrl = story.thumbnail;

    try {
      if (story.thumbnail !== thumbnail) {
        //replace old one
        if (story.thumbnail) {
          const thumbnailRef = storage().refFromURL(story.thumbnail).path;
          await storage().ref(thumbnailRef).delete();
          thumbnailUrl = null;
        }

        if (thumbnail) {
          const localUrl = thumbnail.uri.replace('file://', '');
          const storageRef = storage().ref(
            `/stories/${story.id}/thumbnail/${thumbnail.fileName}`,
          );

          await storageRef.putFile(localUrl);

          thumbnailUrl = await storageRef.getDownloadURL();
        }
      }

      await ref
        .doc(story.id)
        .update({
          title,
          content,
          date,
          thumbnail: thumbnailUrl,
          uploader: username,
        })
        .then(() => {
          console.log('success');
          setLoading(false);
          onConfirmBack();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log('StoryEdit - onEditSubmit() => ', err);
    }
  };

  const onValidate = () => {
    const {title, content} = newStory;
    if (title) {
      Alert.alert(
        'Alert',
        'Confirm submission?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              setLoading(false);
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setLoading(true);
              if (editMode) {
                onEditSubmit();
              } else {
                onSubmit();
              }
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert('Error', "Title can't be empty");
    }
  };

  useEffect(() => {
    checkParams();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const {content, title, thumbnail} = newStory;
  return (
    <ScrollView
      style={[
        {flex: 1, backgroundColor: Color.white},
        loading && {opacity: 0.5},
      ]}>
      <KeyboardAvoidingView>
        <Header
          onPress={() => {
            onGoBack();
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
                source={
                  editMode
                    ? thumbnail
                      ? thumbnail.uri
                        ? {uri: thumbnail.uri}
                        : {uri: thumbnail}
                      : placeholderImage
                    : thumbnail
                    ? {uri: thumbnail.uri}
                    : placeholderImage
                }
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
              {!thumbnail && (
                <Text
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: 130,
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
        <View style={{paddingHorizontal: 20}}>
          <Text style={{fontWeight: 'bold'}}>Title</Text>
          <Input
            value={title}
            onChangeText={(text) => onChange('title', text)}
            placeholder="Title"
          />
          <Text style={{marginTop: 30, fontWeight: 'bold'}}>Message</Text>
          <Input
            value={content}
            onChangeText={(text) => onChange('content', text)}
            placeholder="Say something ..."
            multiline={true}
            lines={10}
          />
        </View>
        <View
          style={{
            margin: 20,
            alignItems: 'flex-end',
          }}>
          <Button
            disabled={loading}
            text={
              editMode
                ? loading
                  ? 'Upadating...'
                  : 'Update'
                : loading
                ? 'Uploading...'
                : 'Upload'
            }
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
