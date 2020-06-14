import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Fab from '../../components/Fab';
import styles from './styles';
import Color from '../../components/Color';

const ref = firestore().collection('stories');

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const onOpenDrawer = () => {
    navigation.openDrawer();
  };

  const onAddStory = () => {
    navigation.navigate('StoryEdit');
  };

  const collectionUpdate = (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
      const {title, content, thumbnail, date} = doc.data();
      const dataObj = {
        id: doc.id,
        title,
        content,
        thumbnail,
        date,
      };
      documents.push(dataObj);
    });
    documents.sort((a, b) => b.id - a.id);
    setData(documents);
    setLoading(false);
  };

  useEffect(() => {
    const subs = ref.onSnapshot((snapshot) => {
      collectionUpdate(snapshot);
    });

    return () => subs;
  }, []);
  const renderStories = (item, index) => {
    const {title, content, thumbnail} = item;
    const last = data.length - 1;

    return (
      <Card
        thumbnail={thumbnail}
        title={title}
        onPress={() => {
          navigation.navigate('StoryDetails', {item, id: item.id});
        }}
        last={index === last ? true : false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header text="Home" onPress={() => onOpenDrawer()} menu="drawer" />
      <FlatList
        data={data}
        renderItem={({item, index}) => renderStories(item, index)}
        keyExtractor={(item) => item.id}
      />

      <Fab onPress={() => onAddStory()} />
      {loading && (
        <View style={styles.loading}>
          <Text>Loading ...</Text>
        </View>
      )}
    </View>
  );
};

export default Home;
