import React, {useState} from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SearchBar({ onSearch=() => {}, onSearching=() => {}, placeholder, style={}, iconSize=25 }) {

  const [currentQuery, setcurrentQuery] = useState('')

  return (
    <View style={searchBarStyles.containerContainer}>
    <View style={[searchBarStyles.container, style ]}>
      <TouchableOpacity onPress={() => onSearch(currentQuery)} >
      <Icon
        name="search"
        size={iconSize}
        color="#dedfe0"
        style={searchBarStyles.icon}
      />
      </TouchableOpacity>
      <TextInput
        style={searchBarStyles.input}
        placeholder={placeholder}
        placeholderTextColor="#dedfe0"
        onChangeText={t => {
          setcurrentQuery(t);
          onSearching(t);
        }}
      />
    </View>
    </View>
  );
};

const searchBarStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128,175,146,0.8)',
    // backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 100,
    // width: Dimensions.get('window').width,
    shadowColor: '#000000',
    elevation: 5,
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 3,
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
    textAlign: 'left',
    margin: 5,
    paddingTop: 2,
  },
});
