import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    width: 150,
    backgroundColor: '#000',
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
const Button = ({text, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      <View style={styles.wrapper}>
        <Text allowFontScaling={false} style={styles.buttonText}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
