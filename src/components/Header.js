import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Hamburger from './Hamburger';
import color from './Color';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: color.darkGrey,
  },
});

const Header = ({text, onPress}) => {
  return (
    <View style={styles.container}>
      <Hamburger onPress={onPress} />
      <Text style={styles.text} allowFontScaling={false}>
        {text}
      </Text>
    </View>
  );
};

export default Header;
