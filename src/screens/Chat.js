import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import getTime from '../utils/getTime';

const Chat = () => {
  const [username, setUsername] = useState();
  const [userUid, setUserUid] = useState();
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState();

  const getUsername = async () => {
    try {
      const usernameValue = await AsyncStorage.getItem('@username');
      setUsername(usernameValue);
    } catch (error) {
      Alert.alert('Warning', `${error}`);
    }
  };

  const getUid = async () => {
    try {
      const userUidValue = await AsyncStorage.getItem('@uid');
      setUserUid(userUidValue);
    } catch (error) {
      Alert.alert('Warning', `${error}`);
    }
  };

  const sendMessageHandler = () => {
    sendMessage
      ? firestore().collection('messages').add({
          username: username,
          text: sendMessage,
          time: firestore.Timestamp.now(),
          uid: userUid,
        })
      : null;

    setSendMessage('');
  };

  useEffect(() => {
    getUsername();

    return () => {
      getUsername();
    };
  });

  useEffect(() => {
    getUid();

    return () => {
      getUid();
    };
  });

  useEffect(() => {
    // Get messages
    const subscriber = firestore()
      .collection('messages')
      .orderBy('time')
      .onSnapshot(documentSnapshot => {
        setMessages(documentSnapshot.docs.map(doc => doc.data()));
      });

    return () => subscriber();
  });

  return (
    <View style={styles.body}>
      <View style={styles.groupChatHeader}>
        <Image
          source={require('../../assets/images/public.png')}
          style={styles.groupChatImage}
          resizeMode="cover"
        />
        <View style={styles.groupChatProfileContainer}>
          <Text style={styles.groupChatProfileTitle}>Public</Text>
          <Text style={styles.groupChatProfileDescription}>
            Public chat group
          </Text>
        </View>
      </View>
      <ScrollView
        style={styles.groupChatBody}
        ref={ref => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({animated: true})
        }>
        {messages.map(({uid, username, text, time}, index) => (
          <View
            style={uid === userUid ? styles.userChat : styles.othersChat}
            key={index}>
            {uid === userUid ? null : (
              <Text style={styles.chatSender}>{username}</Text>
            )}
            <Text style={styles.chatText}>{text}</Text>
            <Text style={styles.chatTime}>{`${getTime(
              `${time.toDate()}`,
            )}`}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.groupChatInputChat}>
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Type message..."
            value={sendMessage}
            onChangeText={value => setSendMessage(value)}
            multiline
          />
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#D8DBDE' : '#EAEFF3',
              },
              styles.sendChatButton,
            ]}
            onPress={sendMessageHandler}>
            <Image
              source={require('../../assets/images/vector.png')}
              style={styles.sendChatButtonImage}
              resizeMode="cover"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F8FAFD',
    flex: 1,
  },
  groupChatHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  groupChatImage: {
    width: 44,
    height: 44,
  },
  groupChatProfileContainer: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  groupChatProfileTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#2C3A59',
    fontSize: 18,
    marginTop: -2,
  },
  groupChatProfileDescription: {
    fontFamily: 'Poppins-Light',
    color: '#808BA2',
    fontSize: 14,
    marginTop: -4,
  },
  groupChatBody: {
    flex: 1,
    paddingHorizontal: 24,
  },
  groupChatInputChat: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  chatInputContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  chatInput: {
    flex: 1,
    color: '#999999',
    fontSize: 16,
    fontFamily: 'Poppins-Light',
  },
  sendChatButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  sendChatButtonImage: {
    width: 16,
    height: 15,
  },
  othersChat: {
    alignSelf: 'flex-start',
    minWidth: '30%',
    backgroundColor: '#EBEFF3',
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  userChat: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    minWidth: '30%',
    backgroundColor: '#FFFFFF',
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
  },
  chatSender: {
    color: '#505C6B',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  chatText: {
    color: '#505C6B',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  chatTime: {
    color: '#505C6B',
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },
});

export default Chat;
