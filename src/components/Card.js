import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import Color from './Color';

const commentBlack = require('../../assets/icons/comment_black_24dp.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: Color.white,
  },
  title: {
    color: Color.black,
    flex: 1,
    fontSize: 16,
  },
  imageWrapper: {
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const img = require('../../assets/image/testimg.jpg');
const Card = ({title, content, onPress, comments, last, thumbnail}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, last && {marginBottom: 70}]}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={thumbnail ? {uri: thumbnail} : img}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <Text allowFontScaling={false} style={styles.title}>
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
