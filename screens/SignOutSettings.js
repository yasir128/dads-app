import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import Button from '../components/Button';


export default function SignOutSettings({ navigation, route }) {

  const [user, setUser] = useState(null)

  useEffect(() => {
  })

  const signOut = () => {
    auth().signOut().then(() => console.log("Signed out"))
  }

  return (
    <SafeAreaView style={signOutSettingsStyle.containerContainer}>
      <ScrollView style={signOutSettingsStyle.container}>
        <View style={[signOutSettingsStyle.sectionContainer]}>
          <Text style={signOutSettingsStyle.sectionTitle}>Sign Out</Text>
          <Text style={signOutSettingsStyle.sectionBody}>To sign out, press Confirm Sign Out below. This will log you out of the account redirecting you to the login page.</Text>
          <Button
            onPress={signOut}
            buttonTitle={"Confirm Sign Out"}
            color={"#1d83f7"}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const signOutSettingsStyle = StyleSheet.create({
  containerContainer: {
    marginTop: 30,
  },
  container: {
  },
  sectionContainer: {
    margin: 30,
  },
  sectionTitle: {
    color: '#636062',
    fontSize: 20,
  },
  sectionBody: {
    padding: 5,
    color: '#bababa',
    marginBottom: 10,
    fontSize: 12,
    marginLeft: 10,
  },
  updateEmailInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#5c51ba',
    margin: 10,
    paddingBottom: 3,
    padding: 10,
  },
});
