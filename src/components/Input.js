import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Color from './Color';
import ImagePicker from 'react-native-image-picker';

const bold = require('../../assets/icons/bold.png');
const image = require('../../assets/icons/photo.png');
const sendIcon = require('../../assets/icons/round_send_black_24dp.png');

const styles = StyleSheet.create({
  inputWrapper: {
    //marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: Color.lightGrey,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    textAlignVertical: 'center',
    padding: 10,
  },
  editorMenu: {
    backgroundColor: Color.black,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    height: 35,
  },
  toggle: {
    padding: 5,
    marginHorizontal: 5,
  },
});

const Input = ({
  value,
  onChangeText,
  multiline,
  onPressImage,
  placeholder,
  send,
  lines,
  center,
  bold,
  onSendPress,
}) => {
  const [toggleBold, setToggleBold] = useState(false);

  const onToggle = (type) => {
    switch (type) {
      case 'bold':
        setToggleBold(!toggleBold);
        break;
      case 'image':
        onPressImage;
        break;
      default:
        break;
    }
  };

  const renderEditorMenu = () => {
    return (
      <View style={styles.editorMenu}>
        <TouchableOpacity
          onPress={() => {
            onToggle('bold');
          }}
          style={[
            styles.toggle,
            toggleBold && {
              borderBottomWidth: 1,
              borderBottomColor: Color.white,
            },
          ]}>
          <Image source={bold} style={{width: 16, height: 16}} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onToggle('image');
          }}
          style={styles.toggle}>
          <Image source={image} style={{width: 16, height: 16}} />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {});

  return (
    <View style={styles.inputWrapper}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={[
            styles.input,
            multiline && {textAlignVertical: 'top'},
            center && {textAlign: 'center'},
            bold && {fontWeight: 'bold'},
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={lines}
        />
        {send && (
          <TouchableOpacity
            onPress={onSendPress}
            disabled={value ? false : true}>
            <View
              style={{
                width: 30,
                height: 30,
              }}>
              <Image
                source={sendIcon}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
