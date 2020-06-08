// import 'react-native-gesture-handler';
import React from 'react';
import {Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from '../screens/Login';
import Home from '../screens/Home';
import StoryEdit from '../screens/StoryEdit';

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#000',
  },
});

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="slide"
      drawerStyle={styles.drawer}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="StoryEdit" component={StoryEdit} />
    </Drawer.Navigator>
  );
};

const AuthStack = createStackNavigator();
const rootStack = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Home" component={HomeDrawer} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default rootStack;

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
