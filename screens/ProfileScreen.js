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

const EditButton = ({ label, color, iconName, onPress, size=40 }) => (
  <TouchableOpacity style={editButtonStyles.container} onPress={onPress}>
    <CircleIcon
      Icon={<Icon size={size/2} name={iconName} color="#ffff" />}
      size={size}
      color={color}
    />
    <Text style={editButtonStyles.labelText}>{label}</Text>
  </TouchableOpacity>
);


  const SettingButton = ({ label, onPress}) => (
  <TouchableOpacity style={settingButtonStyles.container} onPress={onPress}>
    <Text style={settingButtonStyles.labelText}>{label}</Text>
    <View style={settingButtonStyles.iconContainer}>
      <CircleIcon Icon={<Icon size={15} name={"chevron-right"} color="black" />} size={25} color='#f0eff2' />
    </View>
  </TouchableOpacity>
);


const settingButtonStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    width: '100%',
    backgroundColor: '#f6f6f6',
    padding: 20,
    borderRadius: 10,
    //SHADOW
    shadowColor: '#b7b5b5',
    elevation: 1,
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  labelText: {
    marginLeft: 7,
    fontSize: 15,
    color: '#000000',
    flex: 0.9,
  },
  iconContainer: {
    flex: 0.1,
  },
})

const displayNameContainerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    width: 150,
  },
})

export default function Profile({ navigation, route }) {

  const [reload, setReload] = useState()

  const [user, setUser] = useState()

  const [accountActive, setAccountActive] = useState('loading')

  useEffect(() => {
    setUser(auth().currentUser)

    // CALCULATE ACTIVE DAYS
    let creationDate = new Date(auth().currentUser.metadata.creationTime)
    let now = new Date()

    setAccountActive(timeBetween(creationDate, now))

  }, [reload])

  const changeProfilePicture = () => {

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
        multiline
        style={displayNameContainerStyles.text}>{user && user.displayName}</TextInput>
        {!editMode && <EditButton color="#1f98c4" iconName="edit" size={20} onPress={() => {inputRef.focus(); setEditMode(true);}} /> }
        {(editMode && !loading) && <EditButton onPress={updateDisplayName} color="#1fc44b" iconName="check" size={24} /> }
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
          <SettingButton
            label="Email Address"
            onPress={() => navigation.navigate('Email Address')}
          />
          <SettingButton label="Account" onPress={() => navigation.navigate('Manage Account')}/>
        </View>
      </View>
      <View style={profileStyles.sectionContainer}>
        <Text style={profileStyles.sectionTitle}>General</Text>
        <SettingButton label="Sign Out" onPress={() => navigation.navigate('Sign Out')} />
      </View>


      {/* Change email address */}

    </SafeAreaView>
  );
}

const editButtonStyles = StyleSheet.create({
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
    marginTop: 5,
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
