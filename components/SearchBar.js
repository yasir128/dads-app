import React, {useState} from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SearchBar({ onSearch=() => {}, onSearching=() => {}, placeholder, style={}, iconSize=25 }) {

  const [currentQuery, setcurrentQuery] = useState('')

  return (
    <View style={[searchBarStyles.container, style ]}>
      <TextInput
        style={searchBarStyles.input}
        placeholder={placeholder}
        placeholderTextColor="#d1d1d1"
        onChangeText={t => {
          setcurrentQuery(t);
          onSearching(t);
        }}
      />
      <TouchableOpacity onPress={() => onSearch(currentQuery)} >
      <Icon
        name="search"
        size={iconSize}
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
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  input: {
    color: '#5e5e5e',
    padding: 5,
    paddingLeft: 7,
    zIndex: 1,
    width: '85%'
  },
  icon: {
    flex: 1,
    textAlign: 'right',
    margin: 5,
  },
});
