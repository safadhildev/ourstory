import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import Color from './Color';

const addIcon = require('../../assets/icons/add_white_24dp.png');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    bottom: 16,
    right: 16,
    backgroundColor: Color.blue,
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const Fab = ({text, onPress, icon}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Image source={addIcon} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default Fab;
