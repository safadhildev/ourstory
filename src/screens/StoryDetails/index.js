import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
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

const commentsEx = [
  {
    user: 'fadhil',
    comment: 'muehehehe',
    date: moment().format('LLLL'),
  },
  {
    user: 'fadhil',
    comment: 'muehdqwdqwdqwehehe',
    date: moment().format('LLLL'),
  },
  {
    user: 'fadhil',
    comment: 'wdqdhehe',
    date: moment().format('LLLL'),
  },
  {
    user: 'fadhil',
    comment: 'muehehehe',
    date: moment().format('LLLL'),
  },
];
const StoryDetails = ({route, navigation}) => {
  const {id} = route.params;
  const [data, setData] = useState({});
  const [newComment, setNewComment] = useState(null);
  const [dimension, setDimension] = useState({
    width: null,
    height: null,
    ratio: 1,
  });

  const getData = (snapshot) => {
    //console.log({snapshot});
    setData(snapshot.data());
    const {title, thumbnail, date, comments, content} = snapshot.data();
    comments.reverse();
    setData({title, thumbnail, comments, date, content});
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  const sendComment = () => {
    const {comments} = data;
    try {
      const docRef = firestore().collection('stories').doc(id);
      if (newComment) {
        comments.push({
          user: 'Crap Bag',
          comment: newComment,
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
        <Header onPress={() => onGoBack()} />
        {thumbnail && (
          <View
            style={[
              {
                height: 300,
                backgroundColor: Color.lightGrey,
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
                const {user, comment, date} = item;
                console.log(item);

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
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: Color.darkGrey,
                        }}>
                        {user}
                      </Text>
                      <Text style={{fontSize: 10, color: Color.grey}}>
                        {moment(date).format('llll')}
                      </Text>
                    </View>
                    <Text style={{fontSize: 16, color: Color.darkGrey}}>
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
