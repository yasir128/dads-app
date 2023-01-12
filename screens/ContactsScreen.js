import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Avatar from '../components/Avatar'

const mockContacts = [
  {
    name: 'Winny Van Velthoven',
    lastText: 'nisi in pulvinar pretium',
  },
  {
    name: 'Dejalme Moura',
    lastText: 'cras id libero fames',
  },
  {
    name: 'Nagraj Anchan',
    lastText: 'risus vel praesent pellentesque',
  },
  {
    name: 'Lorraine Richards',
    lastText: 'ad dictum dictum mi',
  },
  {
    name: 'Héctor Rolón',
    lastText: 'pharetra quisque taciti etiam',
  },
  {
    name: 'Esma Çamdalı',
    lastText: 'eget ullamcorper porta aenean',
  },
  {
    name: 'Logan Rodriguez',
    lastText: 'condimentum potenti tempor mattis',
  },
  {
    name: 'Ceyhan Babacan',
    lastText: 'mauris lorem id sem',
  },
  {
    name: 'Matilda Koskinen',
    lastText: 'venenatis dolor magna elit',
  },
  {
    name: 'Gabino Gamez',
    lastText: 'vitae vivamus feugiat placerat',
  },
  {
    name: 'Dobrilo Salko',
    lastText: 'pharetra lacus per rutrum',
  },
  {
    name: 'William Smith',
    lastText: 'torquent elit rhoncus commodo',
  },
];

const Contact = ({ name, onPress, lastText }) => (
  <TouchableOpacity style={contactStyle.container} onPress={() => onPress(name)}>
    <Avatar size={50} />
    <View style={contactStyle.infoContainer}>
      <Text style={contactStyle.contactName}>{name}</Text>
      <Text style={contactStyle.lastText}>{lastText}</Text>
    </View>
  </TouchableOpacity>
);

export default function Contacts({ navigation, route }) {

  const message = ( name ) => { console.log(name); navigation.navigate('Chat', {name: name}); }

  return (
    <SafeAreaView style={contactsStyles.container}>
      <ScrollView>
        <View>
          {mockContacts.map(({ name, lastText }) => (
            <Contact name={name} lastText={lastText} onPress={message} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const contactStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 60,
    padding: 5,
    backgroundColor: '#92bda3',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15,
  },
  contactName: {
    fontSize: 20,
    color: '#595658',
  },
  lastText: {
    color: '#8c8a8b',
    fontSize: 10,
    marginTop: 5,
  },
});

const contactsStyles = StyleSheet.create({
  container: {},
});
