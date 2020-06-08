/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './src/routes/navigation';
import color from './src/components/Color';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={color.white} />
      <Navigation />
    </>
  );
};

export default App;
