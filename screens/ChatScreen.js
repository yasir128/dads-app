import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const Message = ({ content, me }) => (
  <View style={[messageStyles.container, me && messageStyles.right]}>
    <Text style={[messageStyles.text, me && messageStyles.rightText]}>
      {content}
    </Text>
  </View>
);

export default function Chat({ navigation, route }) {
  return (

    <SafeAreaView style={chatStyles.container}>
      <ScrollView>
        <View style={chatStyles.messagesContainer}>
          <Message content="Hello, how are you doing?" />
          <Message content="Yeh, quite good thanks, how about you?" me />
          <Message content="Been better" />
          <Message
            content={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
            me
          />
        </View>
      </ScrollView>
      <View style={chatStyles.chatboxContainer}>
        <TextInput style={chatStyles.chatbox} placeholder="Type a message" multiline />
        <TouchableOpacity style={chatStyles.sendButtonContainer}>
          <Icon name="location-arrow" size={20} color="#ffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const messageStyles = StyleSheet.create({
  container: {
    backgroundColor: '#4863ff', //'#d4d8de',
    padding: 15,
    borderRadius: 8,
    margin: 7,
    width: '80%',
  },
  right: {
    backgroundColor: '#73bf73', // '#4863ff',
    marginLeft: '19%',
  },
  rightText: {
    color: '#ffff',
  },
  text: {
    //color: '#7e7e7f',
    color: '#ffff',
  },
});

const chatStyles = StyleSheet.create({
  container: {
    marginTop: 40,
    display: 'flex',
    flex: 1,
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  chatboxContainer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    padding: 5,
  },
  chatbox: {
    backgroundColor: '#d4d8de',
    width: '85%',
    padding: 5,
    borderRadius: 10,
  },
  sendButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5b46c4',
    borderRadius: 100,
    margin: 5,
    width: 48,
    height: 48,
  },
});
