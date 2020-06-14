import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import color from '../../components/Color';
import Color from '../../components/Color';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  thumbnailWrapper: {
    width: '100%',
  },
  uploaderText: {
    fontSize: 12,
    color: color.blue,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Color.black,
  },
  dateText: {
    fontSize: 10,
    color: Color.grey,
  },
  contentText: {
    fontSize: 14,
    paddingVertical: 20,
  },
  commentSection: {
    borderTopWidth: 1,
    borderTopColor: Color.lightGrey,
    paddingVertical: 10,
    marginTop: 30,
  },
});

export default styles;
