import React from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';

const Home = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Chat');
  };

  return (
    <View style={styles.body}>
      <View style={styles.homeHeader}>
        <Text style={styles.homeHeaderText}>ChitChat</Text>
      </View>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e5e7eb' : '#FFFFFF',
          },
          styles.chatContainer,
        ]}
        onPress={onPress}>
        <Image
          source={require('../../assets/images/public.png')}
          style={styles.chatImage}
          resizeMode="cover"
        />
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatTextTitle}>Public</Text>
          <Text style={styles.chatTextDescription}>Public chat group</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  homeHeader: {
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  homeHeaderText: {
    fontFamily: 'Poppins-Medium',
    color: '#2C3A59',
    fontSize: 24,
  },
  chatContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  chatImage: {
    width: 56,
    height: 56,
  },
  chatTextContainer: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  chatTextTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#2C3A59',
    fontSize: 20,
    marginTop: -4,
  },
  chatTextDescription: {
    fontFamily: 'Poppins-Light',
    color: '#808BA2',
    fontSize: 16,
    marginTop: -4,
  },
  chatTimeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
  },
  chatTime: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#808BA2',
  },
});

export default Home;
