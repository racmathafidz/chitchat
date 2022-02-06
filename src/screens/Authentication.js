import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const Authentication = () => {
  const [username, setUsername] = useState();

  const AuthHandler = () => {
    auth()
      .signInAnonymously()
      .then(async () => {
        try {
          await AsyncStorage.setItem('@username', `${username}`);
        } catch (error) {
          Alert.alert('Warning', `${error}`);
        }
      })
      .catch(error => {
        Alert.alert('Warning', `${error.code} - ${error.message}`);
      });
  };

  return (
    <View style={styles.body}>
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>Enter your username</Text>
        <Text style={styles.authDescription}>
          Your username will be displayed in the chat.
        </Text>
        <TextInput
          style={styles.authInput}
          placeholder="Your username"
          onChangeText={value => setUsername(value)}
        />
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#0061c2' : '#1F8DF5',
            },
            styles.authButton,
          ]}
          onPress={AuthHandler}
          disabled={!username && true}>
          <Text style={styles.authButtonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  authContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  authTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#2C3A59',
    fontSize: 30,
    marginBottom: 4,
    textAlign: 'center',
  },
  authDescription: {
    fontFamily: 'Poppins-Light',
    color: '#808BA2',
    width: 300,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  authInput: {
    fontFamily: 'Poppins-Light',
    backgroundColor: '#EBEFF3',
    color: '#505C6B',
    width: 300,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  authButton: {
    width: 300,
    borderRadius: 10,
    marginTop: 16,
  },
  authButtonText: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 10,
  },
});

export default Authentication;
