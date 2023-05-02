import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function InputField({ label, onInput, password, keyboardType, style }) {
  return (
    <View style={inputFieldStyles.container}>
      <View style={inputFieldStyles.labelContainer}>
        <Text style={inputFieldStyles.label}>{label}</Text>
      </View>
      <View style={inputFieldStyles.textInputContainer}>
        <TextInput
          cursorColor="white"
          autoCapitalize="none"
          secureTextEntry={password}
          keyboardType={keyboardType || 'default'}
          style={inputFieldStyles.textInput}
          onChangeText={onInput}></TextInput>
      </View>
    </View>
  );
}

const inputFieldStyles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    backgroundColor: '#43885e',
    width: '80%',
    borderRadius: 10,
    height: 50,
    marginBottom: 30,
  },
  labelContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    marginBottom: 5,
    color: 'white',
    textAlign: 'left',
    flex: 1,
    marginLeft: 30,
  },
  textInput: {
    width: '80%',
    borderRadius: 10,
    height: 50,
    fontSize: 18,
    marginLeft: 5,
    color: 'white',
  },
});
