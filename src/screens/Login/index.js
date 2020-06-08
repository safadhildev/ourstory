import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';

const Login = () => {
  const {navigate} = useNavigation();
  const onLogin = () => {
    navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Button text="Login" onPress={() => onLogin()} />
    </View>
  );
};

export default Login;
