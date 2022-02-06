import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import AuthenticationScreen from './screens/Authentication';
import HomeScreen from './screens/Home';
import ChatScreen from './screens/Chat';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [username, setUsername] = useState();
  const [user, setUser] = useState();

  const onAuthStateChanged = async userData => {
    setUser(userData);
    userData && AsyncStorage.setItem('@uid', `${userData.uid}`);
    initializing && setInitializing(false);
  };

  const getUsername = async () => {
    try {
      const usernameValue = await AsyncStorage.getItem('@username');
      setUsername(usernameValue);
      initializing && setInitializing(false);
    } catch (error) {
      Alert.alert('Warning', `${error}`);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return () => {
      subscriber();
    };
  });

  useEffect(() => {
    getUsername();

    return () => {
      getUsername();
    };
  });

  useEffect(() => {
    SplashScreen.hide();
  });

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        {user && username ? (
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="Authentication"
            component={AuthenticationScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
