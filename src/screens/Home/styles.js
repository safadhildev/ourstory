import React from 'react';
import {StyleSheet} from 'react-native';
import color from '../../components/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  loading: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 70,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});

export default styles;
