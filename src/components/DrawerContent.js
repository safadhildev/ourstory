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

const userRef = firestore().collection('users');
const userIcon = require('../../assets/icons/007-user-2.png');
const logout = require('../../assets/icons/neons/001-logout.png');
const home = require('../../assets/icons/neons/022-home.png');

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
    const results = await userRef.doc('23021995').get();
    console.log({user});

    if (results.exists) {
      setUser(results.data());
    }
  };
  useEffect(() => {
    // const subs = userRef.onSnapshot((snapshot) => {
    //   collectionUpdate(snapshot);
    // });

    // return () => subs;

    getUserDetails();
  }, []);

  const navigateTo = (item) => {
    navigation.navigate(item);
  };

  const {name} = user;
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section>
          <View style={styles.header}>
            <Avatar.Image
              source={userIcon}
              style={{backgroundColor: Color.lightGrey}}
              onPress={() => {
                Alert.alert('Alert', 'User');
              }}
            />
            <View>
              <Title>{name}</Title>
              <Caption>@fadhil232</Caption>
            </View>
          </View>
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item
            icon={({color, size}) => (
              <Image
                source={logout}
                style={{width: 24, height: 24, opacity: 1}}
              />
            )}
            label="Home"
            onPress={() => {
              navigateTo('Home');
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
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
