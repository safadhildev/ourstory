import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Hamburger from './Hamburger';
import color from './Color';
import Color from './Color';

const drawerBlack = require('../../assets/icons/round_menu_black_48dp.png');
const drawerWhite = require('../../assets/icons/menu_white_24dp.png');
const backBlack = require('../../assets/icons/round_arrow_back_black_48dp.png');
const editIcon = require('../../assets/icons/round_edit_black_24dp.png');
const deleteIcon = require('../../assets/icons/round_delete_black_24dp.png');
const addIcon = require('../../assets/icons/round_add_black_48dp.png');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  text: {
    flex: 3,
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

const Header = ({
  text,
  onPress,
  menu,
  edit,
  remove,
  onDeletePress,
  onEditPress,
  add,
  onAddPress,
}) => {
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
      <Text
        style={styles.text}
        allowFontScaling={false}
        numberOfLines={1}
        ellipsizeMode="tail">
        {text}
      </Text>
      {add && (
        <TouchableOpacity onPress={onAddPress}>
          <Image
            source={addIcon}
            style={{
              width: 36,
              height: 36,
              alignSelf: 'flex-end',
            }}
          />
        </TouchableOpacity>
      )}
      {edit && (
        <TouchableOpacity onPress={onEditPress}>
          <Image
            source={editIcon}
            style={{width: 24, height: 24, marginHorizontal: 10}}
          />
        </TouchableOpacity>
      )}
      {remove && (
        <TouchableOpacity onPress={onDeletePress}>
          <Image
            source={deleteIcon}
            style={{width: 24, height: 24, marginLeft: 10}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
