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
} from 'react-native';
import Header from '../../components/Header';
import {useNavigation, useNavigationParam} from '@react-navigation/native';
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
  const [data, setData] = useState({
    title: null,
    content: null,
    thumbnail: null,
    date: null,
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

  const getData = (snapshot) => {
    try {
      const {title, thumbnail, date, comments, content} = snapshot.data();

      if (comments) {
        comments.reverse();
      }
      setData({title, thumbnail, comments, date, content});
    } catch (err) {
      console.log({err});
    }
  };

  const onDeleteStory = async (id) => {
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

  const onEditStory = (id) => {
    navigation.navigate('StoryEdit', {id, data});
  };
  const sendComment = () => {
    const {comments} = data;

    try {
      const docRef = firestore().collection('stories').doc(id);
      if (newComment) {
        comments.push({
          id: moment().unix().toString(),
          user: 'Crap Bag',
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
      console.log({error});
    }
  };

  const onDeleteComment = async (commentId) => {
    console.log({commentId});
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

  const {title, content, thumbnail, date, comments} = data;

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={[styles.container]}>
        <Header
          text="deoijdioedoiejdejodejdoiedoiecj"
          onPress={() => onGoBack()}
          remove
          onDeletePress={() => onDeleteStory(id)}
          //   edit
          //   onEditPress={() => onEditStory(id)}
        />
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
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.headerText} allowFontScaling={false}>
              {title}
            </Text>
          </View>
          <Text style={styles.dateText} allowFontScaling={false}>
            {date}
          </Text>
          <Text style={styles.contentText}>{content}</Text>

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
              />
              <View style={{alignItems: 'flex-end'}}>
                <Button
                  text="Send"
                  onPress={() => sendComment()}
                  disabled={newComment ? false : true}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StoryDetails;
