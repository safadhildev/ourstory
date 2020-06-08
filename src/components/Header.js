import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Hamburger from './Hamburger';
import color from './Color';

const drawerBlack = require('../../assets/icons/menu_black_24dp.png');
const drawerWhite = require('../../assets/icons/menu_white_24dp.png');
const backBlack = require('../../assets/icons/back.png');

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
  menuContainer: {
    width: 30,
    height: 30,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

const Header = ({text, onPress, menu}) => {
  const selectMenuType = () => {
    switch (menu) {
      case 'drawer':
        return drawerBlack;
      default:
        return backBlack;
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.menuContainer}>
          <Image
            source={selectMenuType()}
            resizeMode="contain"
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.text} allowFontScaling={false}>
        {text}
      </Text>
    </View>
  );
};

export default Header;
