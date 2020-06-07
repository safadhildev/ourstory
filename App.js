/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const getData = async () => {};

  useEffect(() => {
    getData();
  });

  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <View>
          <Text>Hello There</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
