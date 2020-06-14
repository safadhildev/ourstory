import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import Color from './Color';

const commentBlack = require('../../assets/icons/comment_black_24dp.png');
const userBlack = require('../../assets/icons/round_account_circle_black_48dp.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    // borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: Color.white,
  },
  title: {
    color: Color.black,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageWrapper: {
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const img = require('../../assets/image/testimg.jpg');

const Card = ({title, content, onPress, comments, last, thumbnail}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, last && {marginBottom: 70}]}
      activeOpacity={0.8}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            paddingVertical: 5,
            alignItems: 'center',
          }}>
          <Image source={userBlack} style={{width: 30, height: 30}} />
          <Text style={{paddingLeft: 10}}>User</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={thumbnail ? {uri: thumbnail} : img}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <Text
            allowFontScaling={false}
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={{paddingHorizontal: 5}}>1</Text>
            <View
              style={{
                width: 24,
                height: 24,
                opacity: 0.7,
              }}>
              <Image
                source={commentBlack}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

/** Green Dot
 * <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: Color.green,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 1,
                borderRadius: 20,
              }}
            />
 */
