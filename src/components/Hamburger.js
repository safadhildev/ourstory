import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import color from './Color';

const styles = StyleSheet.create({
  wrapper: {
    height: 18,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  line: {
    width: 25,
    height: 3,
    backgroundColor: color.darkGrey,
    borderRadius: 5,
  },
});
const Hamburger = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </TouchableOpacity>
  );
};

export default Hamburger;
