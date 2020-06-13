// import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Linking} from 'react-native';
import {Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import DrawerContent from '../components/DrawerContent';

import Login from '../screens/Login';
import Home from '../screens/Home';
import StoryEdit from '../screens/StoryEdit';
import StoryDetails from '../screens/StoryDetails';

const styles = StyleSheet.create({
  drawer: {
    margin: 0,
    padding: 0,
  },
});

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text>Hello</Text>
      </View>
      <DrawerItem
        label="Fadhil"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
        style={{
          backgroundColor: '#000',
        }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const MainStack = createStackNavigator();
const HomeStack = () => {
  return (
    <MainStack.Navigator initialRouteName="Home" headerMode={false}>
      <rootStack.Screen name="Home" component={Home} />
      <rootStack.Screen name="StoryEdit" component={StoryEdit} />
      <rootStack.Screen name="StoryDetails" component={StoryDetails} />
    </MainStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="slide"
      drawerStyle={styles.drawer}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );
};

const rootStack = createStackNavigator();
const stack = () => {
  return (
    <NavigationContainer>
      <rootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <rootStack.Screen name="Login" component={Login} />
        <rootStack.Screen name="Home" component={HomeDrawer} />
        <rootStack.Screen name="StoryEdit" component={StoryEdit} />
        <rootStack.Screen name="StoryDetails" component={StoryDetails} />
      </rootStack.Navigator>
    </NavigationContainer>
  );
};

export default stack;

/**
 *  options={{
          headerTitle: 'HEHEHEH',
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
*/
