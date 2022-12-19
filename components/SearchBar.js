import React, {useState} from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SearchBar({ onSearch }) {

  const [currentQuery, setcurrentQuery] = useState('')

  return (
    <View style={searchBarStyles.container}>
      <TextInput
        style={searchBarStyles.input}
        placeholder="search for a section"
        onChangeText={t => setcurrentQuery(t)}
      />
      <TouchableOpacity onPress={() => onSearch(currentQuery)} >
      <Icon
        name="search"
        size={25}
        color="#80af92"
        style={searchBarStyles.icon}
      />
      </TouchableOpacity>
    </View>
  );
};

const searchBarStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f8f9',
    padding: 10,
    margin: 5,
    borderRadius: 100,
  },
  input: {
    color: '#5e5e5e',
    padding: 5,
    paddingLeft: 7,
    width: '85%',
    zIndex: 1,
  },
  icon: {
    flex: 1,
    textAlign: 'right',
    margin: 5,
  },
});
