import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import Header from '../../components/Header';
import {useNavigation, useNavigationParam} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import Color from '../../components/Color';
import Input from '../../components/Input';
import Button from '../../components/Button';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const deleteIcon = require('../../../assets/icons/round_delete_black_24dp.png');

const StoryDetails = ({route}) => {
  const {id} = route.params;
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title: null,
    content: null,
    thumbnail: null,
    date: null,
    comments: [],
    uploader: null,
  });

  const [newComment, setNewComment] = useState(null);
  const [dimension, setDimension] = useState({
    width: null,
    height: null,
    ratio: 1,
  });
  const navigation = useNavigation();

  const onGoBack = () => {
    navigation.goBack();
  };

  const getUser = async () => {
    try {
      const current = await AsyncStorage.getItem('username');
      setCurrentUser(current);
    } catch (err) {
      console.log('StoryDetails - getUser', err);
    }
  };
  const getData = (snapshot) => {
    try {
      const {
        title,
        thumbnail,
        date,
        comments,
        content,
        uploader,
      } = snapshot.data();
      if (comments) {
        comments.reverse();
      }

      setData({title, thumbnail, date, content, comments, uploader});
      setLoading(false);
    } catch (err) {
      console.log('Story Details - getData()', err);
    }
  };

  const onConfirmDelete = async (id) => {
    setLoading(true);
    const docRef = firestore().collection('stories').doc(id);
    let thumbnailRef = null;

    if (data.thumbnail) {
      thumbnailRef = storage().refFromURL(data.thumbnail).path;

      await storage().ref(thumbnailRef).delete();
    }
    docRef
      .delete()
      .then(() => {
        console.log('Story Deleted');
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const onDeleteStory = async (id) => {
    Alert.alert(
      'Delete',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            onConfirmDelete(id);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onEditStory = (id) => {
    navigation.navigate('StoryEdit', {id, data});
  };

  const sendComment = async () => {
    const {comments} = data;
    try {
      const docRef = firestore().collection('stories').doc(id);

      if (newComment) {
        comments.push({
          id: moment().unix().toString(),
          user: currentUser,
          comment: newComment.trim(),
          date: moment().format('LLLL'),
        });
        docRef
          .update({
            comments: comments,
          })
          .then(() => {
            setNewComment(null);
            console.log('updated');
          });
      }
    } catch (error) {
      console.log('StoryDetails - sendComment', error);
    }
  };

  const onDeleteComment = async (commentId) => {
    const docRef = firestore().collection('stories').doc(id);

    const filterComments = data.comments.filter(
      (item) => item.id !== commentId,
    );

    docRef.update({comments: filterComments});
  };

  useEffect(() => {
    try {
      const docRef = firestore().collection('stories').doc(id);
      const subs = docRef.onSnapshot((snapshot) => {
        getData(snapshot);
      });
      return () => subs;
    } catch (error) {
      console.log({error});
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const {title, content, thumbnail, date, comments, uploader} = data;

  return (
    <View style={[styles.container]}>
      <Header
        onPress={() => onGoBack()}
        remove={data.uploader === currentUser && true}
        onDeletePress={() => onDeleteStory(id)}
        edit={data.uploader === currentUser && true}
        onEditPress={() => onEditStory(id)}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {thumbnail && (
          <View
            style={[
              {
                height: 250,
              },
            ]}>
            <Image
              source={{uri: thumbnail}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
        )}
        <View style={{padding: 20}}>
          <Text style={styles.uploaderText}>@{uploader}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.headerText} allowFontScaling={false}>
              {title}
            </Text>
          </View>
          <Text style={styles.dateText} allowFontScaling={false}>
            {date}
          </Text>
          <Text style={styles.contentText} allowFontScaling={false}>
            {content}
          </Text>

          <View style={styles.commentSection}>
            <Text style={{color: Color.darkGrey}}>Comments</Text>
            {comments &&
              comments.map((item) => {
                const {user, comment, date, id} = item;

                return (
                  <View
                    style={{
                      backgroundColor: Color.lightGrey,
                      marginVertical: 5,
                      padding: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: Color.darkGrey,
                        }}>
                        {user}
                      </Text>
                      {user === currentUser && (
                        <TouchableOpacity
                          onPress={() => {
                            onDeleteComment(id);
                          }}>
                          <View>
                            <Image
                              source={deleteIcon}
                              style={{width: 24, height: 24}}
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                    <Text style={{fontSize: 10, color: Color.grey}}>
                      {moment(date).format('llll')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.darkGrey,
                      }}>
                      {comment}
                    </Text>
                  </View>
                );
              })}
            <View style={{marginTop: 30}}>
              <Input
                placeholder="Leave a comment"
                send
                multiline
                value={newComment}
                onChangeText={(text) => {
                  setNewComment(text);
                }}
                onPress={() => {
                  sendComment();
                }}
                onSendPress={() => sendComment()}
              />
              {/* <View style={{alignItems: 'flex-end'}}>
                <Button
                  text="Send"
                  onPress={() => sendComment()}
                  disabled={newComment ? false : true}
                />
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: Color.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading . . .</Text>
        </View>
      )}
    </View>
  );
};

export default StoryDetails;
