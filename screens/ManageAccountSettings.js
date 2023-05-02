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


export default function ManageAccountSettings({ navigation, route }) {

  const [user, setUser] = useState(null)

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false)

  const [deleteAccountError, setDeleteAccountError] = useState(false)

  useEffect(() => {
    auth().currentUser.reload().then(ok => {
      setUser(auth().currentUser)
      setEmailInput(user.email)
    })
  })

  const deleteAccount = () => {
    setDeleteAccountLoading(true)
    user.delete().then(() => {
      setDeleteAccountLoading(false)
    }).catch(err => setDeleteAccountError(err.message))
  }

  return (
    <SafeAreaView style={manageAccountSettingsStyles.containerContainer}>
      <ScrollView style={manageAccountSettingsStyles.container}>
        <View style={[manageAccountSettingsStyles.sectionContainer]}>
          <Text style={manageAccountSettingsStyles.sectionTitle}>Delete Account</Text>
          <Text style={manageAccountSettingsStyles.sectionBody}>
            To permanently delete your account enter you email and password below and press delete account. This will completely remove your account and all related data.
          </Text>
          <Text>Email</Text>
          <TextInput
            style={manageAccountSettingsStyles.input}
            value={emailInput || 'something@example.com'}
            autoCapitalize="none"
            onChangeText={t => setEmailInput(t)} />
            <Text style={manageAccountSettingsStyles.label}>Password</Text>
            <TextInput
              style={[manageAccountSettingsStyles.input, {marginBottom: 30}]}
              placeholder={""}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={t => setPasswordInput(t)} />
          {!deleteAccountLoading && <Button
            onPress={deleteAccount}
            buttonTitle={"Delete Account"}
            color={"#1d83f7"}/>}
          {deleteAccountLoading && <ActivityIndicator />}
          {deleteAccountError && <Text style={[manageAccountSettingsStyles.sectionBody, {color: '#ba5851'}]}>{deleteAccountError}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const manageAccountSettingsStyles = StyleSheet.create({
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
  input: {
    margin: 5,
    marginBottom: 10,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 2,
  },
  label: {
    marginTop: 10,
  },
});
