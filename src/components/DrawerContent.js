import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Drawer, Avatar, Title, Caption} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import Color from './Color';
import {useNavigation} from '@react-navigation/native';
import {set, color} from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';

const userRef = firestore().collection('users');
const userIcon = require('../../assets/icons/007-user-2.png');
const logout = require('../../assets/icons/round_exit_to_app_black_48dp.png');
const homeIcon = require('../../assets/icons/round_home_black_48dp.png');
const profileIcon = require('../../assets/icons/round_person_black_48dp.png');

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: Color.white,
  },
});
const DrawerContent = (props) => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});

  const getUserDetails = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      console.log({username});

      if (username !== null) {
        const results = await userRef.doc(username).get();
        if (results.exists) {
          setUser({...results.data(), id: results.id});
        }
      }
    } catch (e) {
      console.log('Error getting user', e);
    }
    console.log({user});
  };

  const onLogout = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    navigation.navigate('Login');
  };

  useEffect(() => {
    // const subs = userRef.onSnapshot((snapshot) => {
    //   collectionUpdate(snapshot);
    // });

    // return () => subs;

    getUserDetails();
  }, []);

  const navigateTo = (item, param) => {
    navigation.navigate(item, {param});
  };

  const {name, id, image} = user;
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section>
          <View style={styles.header}>
            <Avatar.Image
              source={image ? {uri: image} : userIcon}
              style={{backgroundColor: Color.lightGrey}}
            />
            <View>
              <Title>{name}</Title>
              <Caption>@{id}</Caption>
            </View>
          </View>
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item
            icon={({color, size}) => (
              <Image
                source={homeIcon}
                style={{width: 24, height: 24, opacity: 1}}
              />
            )}
            label="Home"
            onPress={() => {
              navigateTo('Home');
            }}
          />
          <Drawer.Item
            icon={({color, size}) => (
              <Image
                source={profileIcon}
                style={{width: 24, height: 24, opacity: 1}}
              />
            )}
            label="Profile"
            onPress={() => {
              navigateTo('Profile', user);
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          label="Logout"
          icon={({color, size}) => (
            <Image
              source={logout}
              style={{width: 24, height: 24, opacity: 1}}
            />
          )}
          onPress={() => {
            onLogout();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
