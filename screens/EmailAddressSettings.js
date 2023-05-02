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


export default function EmailAddressSettings({ navigation, route }) {

  const [user, setUser] = useState(null)

  const [verified, setVerified] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [loadingVerified, setLoadingVerified] = useState(false)

  const [emailInput, setEmailInput] = useState('')
  const [emailUpdateLoading, setEmailUpdateLoading] = useState(false)
  const [emailUpdated, setEmailUpdated] = useState(false)

  const [error, setError] = useState(false)

  useEffect(() => {
    auth().currentUser.reload().then(ok => {
      setVerified(auth().currentUser.emailVerified)
      setUser(auth().currentUser)
    })
  })

  const confirmEmail = () => {
    setLoadingVerified(true)
    auth().currentUser.sendEmailVerification().then(() => {
      setLoadingVerified(false)
      setVerificationSent(true)
    })
  }

  const updateEmail = () => {
    setEmailUpdateLoading(true)
    user.updateEmail(emailInput).then(() => {
      setEmailUpdateLoading(false)
      setEmailUpdated(true)
    }).catch(err => {
      setError(err.message);
      setEmailUpdateLoading(false)
    })
  }

  return (
    <SafeAreaView style={emailSettingsStyle.containerContainer}>
      <ScrollView style={emailSettingsStyle.container}>
        <View style={[emailSettingsStyle.sectionContainer, {opacity: verified ? 0.5 : 1}]}>
          <Text style={emailSettingsStyle.sectionTitle}>Verify Email Address</Text>
          {!verified && <Text style={emailSettingsStyle.sectionBody}>Confirm your identity by pressing Confirm Email below. You will recieve an email to {user ? user.email : "LOADING..."} with a link. Follow this link to verify your email.</Text>}
          {verified && <Text style={emailSettingsStyle.sectionBody}>Your email has been verified. Thank you for confirming the address it will help make future communications easier :)</Text>}
          {!loadingVerified && <Button
            onPress={confirmEmail}
            buttonTitle={!verified ? "Confirm Email" : "Email Verified"}
            disabled={verified || verificationSent}
            color={!verified ? "#1d83f7" : "#51ba8b"}/>}
          {loadingVerified && <ActivityIndicator />}
        </View>

        <View style={[emailSettingsStyle.sectionContainer, {opacity: emailUpdated ? 0.5 : 1}]}>
          <Text style={emailSettingsStyle.sectionTitle}>Update Email Address</Text>
          {!emailUpdated && <Text style={emailSettingsStyle.sectionBody}>You can change and update your email address by entering a new email below and pressing confirm.</Text>}
          {emailUpdated && <Text style={emailSettingsStyle.sectionBody}>Email updated! You may need to verify this email address above.</Text>}
          <TextInput
            style={emailSettingsStyle.updateEmailInput}
            placeholder={user ? user.email : "Loading..."}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={t => setEmailInput(t)} />
          {!emailUpdateLoading && <Button
            onPress={updateEmail}
            buttonTitle="Confirm"
            disabled={emailUpdateLoading || emailUpdated}
            color="#1d83f7"/>}
          {emailUpdateLoading && <ActivityIndicator />}
          {error && <Text style={[emailSettingsStyle.sectionBody, {color: '#ba5851'}]}>{error}</Text>}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


const emailSettingsStyle = StyleSheet.create({
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
