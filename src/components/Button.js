import React, {useEffect} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Color from './Color';

const styles = StyleSheet.create({
  wrapper: {
    width: 150,
    paddingHorizontal: 30,
    backgroundColor: Color.blue,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadingWrapper: {
    width: 150,
    backgroundColor: Color.grey,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
const Button = ({text, onPress, style, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={style}
      disabled={disabled}>
      <View style={[styles.wrapper, disabled && {backgroundColor: Color.grey}]}>
        <Text allowFontScaling={false} style={styles.buttonText}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
