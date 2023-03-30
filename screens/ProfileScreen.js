import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native';

import timeBetween from '../helperFunctions/timeBetween'

import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Entypo';

import Avatar from '../components/Avatar';
import CircleIcon from '../components/CircleIcon';

const IconLabelButton = ({ label, color, iconName, onPress, size=40 }) => (
  <TouchableOpacity style={iconLabelButtonStyles.container} onPress={onPress}>
    <CircleIcon
      Icon={<Icon size={size/2} name={iconName} color="#ffff" />}
      size={size}
      color={color}
    />
    <Text style={iconLabelButtonStyles.labelText}>{label}</Text>
  </TouchableOpacity>
);



const displayNameContainerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000'
  },
})

export default function Profile({ navigation, route }) {

  const [reload, setReload] = useState()

  const [user, setUser] = useState()

  const [emailVerifiedStatus, setEmailVerifiedStatus] = useState('Press to confirm your email address')

  const [accountActive, setAccountActive] = useState('loading')

  useEffect(() => {
    setUser(auth().currentUser)

    // CALCULATE ACTIVE DAYS
    let creationDate = new Date(auth().currentUser.metadata.creationTime)
    let now = new Date()

    setAccountActive(timeBetween(creationDate, now))

  }, [reload])


  const signOut = () => {
    auth().signOut().then(() => console.log("Signout"))
  }

  const changeProfilePicture = () => {

  }

  const confirmEmail = () => {
    auth().currentUser.sendEmailVerification().then(() => {
      setEmailVerifiedStatus('Please check your emails')
    })
  }




  const DisplayNameContainer = () => {
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [typedName, setTypedName] = useState()

    const [inputRef, setInputRef] = useState()

    const updateDisplayName = () => {
      setLoading(true)
      auth().currentUser.updateProfile({displayName: typedName}).then(() => {
        setLoading(false);
        inputRef.blur()
        setEditMode(false)
      })
    }

    return (
      <View style={displayNameContainerStyles.container}>
        <TextInput
        ref={input => setInputRef(input)}
        onChangeText={t => setTypedName(t)}
        autoCapitalize="words"
        onPressIn={() => setEditMode(true)}
        style={displayNameContainerStyles.text}>{user && user.displayName}</TextInput>
        {!editMode && <IconLabelButton color="#1f98c4" iconName="edit" size={20} onPress={() => {inputRef.focus(); setEditMode(true);}} /> }
        {(editMode && !loading) && <IconLabelButton onPress={updateDisplayName} color="#1fc44b" iconName="check" size={24} /> }
        {loading && <ActivityIndicator color="#1f98c4" size={20} />}
      </View>
    )
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      <View style={profileStyles.topProfileStatusContainer}>
        <TouchableOpacity style={profileStyles.avatarContainer} onPress={changeProfilePicture}>
          <Avatar size={100} />
        </TouchableOpacity>
        <View style={profileStyles.topProfileStatus}>
          <DisplayNameContainer />
          <View style={profileStyles.activeIndicatorContainer}>
            <Text style={profileStyles.activeIndicatorText}>
              account active{' '}{accountActive}
            </Text>
            <View style={profileStyles.activeIndicator}></View>
          </View>
        </View>
      </View>

      <View style={profileStyles.sectionContainer}>
        <Text style={profileStyles.sectionTitle}>Settings</Text>
        <View style={profileStyles.sectionBody}>
          {user && !user.emailVerified && <IconLabelButton
            label={emailVerifiedStatus}
            color="#e52226"
            iconName="mail"
            onPress={confirmEmail}
          /> }
          <IconLabelButton label="Messages" color="#018f99" iconName="chat" />
          <IconLabelButton
            onPress={signOut}
            label="Sign Out"
            color="#4fb2fc"
            iconName="log-out"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const iconLabelButtonStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  labelText: {
    marginLeft: 7,
    fontSize: 15,
    color: '#000000'
  },
});

const profileStyles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  topProfileStatusContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatarContainer: {
    margin: 10,
  },
  topProfileStatus: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    marginLeft: 10,
  },
  activeIndicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  activeIndicator: {
    width: 5,
    height: 5,
    backgroundColor: '#3b64af',
    marginLeft: 4,
    borderRadius: 10,
    marginTop: 5,
  },
  activeIndicatorText: {
    color: '#636062',
  },
  sectionContainer: {
    margin: 30,
  },
  sectionTitle: {
    color: '#636062',
    fontSize: 20,
    marginBottom: 10,
  },
  sectionBody: {
    marginLeft: 5,
  },
});
