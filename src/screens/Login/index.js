import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import Input from '../../components/Input';

const welcomeImage = require('../../../assets/image/welcome.jpg');

const Login = () => {
  const {navigate} = useNavigation();
  const [username, setUsername] = useState(null);

  const onLogin = async () => {
    try {
      const userRef = await firestore().collection('users').doc(username).get();

      // console.log(userRef.exists);

      if (userRef.exists) {
        console.log('exists');
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('user', JSON.stringify(userRef.data()));
        navigate('Home');
      } else {
        Alert.alert('Error', 'username is incorrect');
      }
    } catch (e) {
      console.log(e);

      // saving error
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Image
            source={welcomeImage}
            style={{
              width: 300,
              height: 300,
              backgroundColor: '#000',
              alignSelf: 'center',
            }}
          />
          <View style={{width: 350, padding: 30}}>
            <Input
              placeholder="Username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
              bold
              send
              onSendPress={() => {
                onLogin();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Login;
