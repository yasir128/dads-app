import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Entypo';

import Avatar from '../components/Avatar';
import CircleIcon from '../components/CircleIcon';

const IconLabelButton = ({ label, color, iconName, onPress }) => (
  <TouchableOpacity style={iconLabelButtonStyles.container} onPress={onPress}>
    <CircleIcon
      Icon={<Icon size={20} name={iconName} color="#ffff" />}
      size={40}
      color={color}
    />
    <Text style={iconLabelButtonStyles.labelText}>{label}</Text>
  </TouchableOpacity>
);

export default function Profile({ navigation, route }) {

  const signOut = () => {
    auth().signOut().then(() => console.log("Signout"))
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      <View style={profileStyles.topProfileStatusContainer}>
        <View style={profileStyles.avatarContainer}>
          <Avatar size={100} />
        </View>
        <View style={profileStyles.topProfileStatus}>
          <Text style={profileStyles.username}>John Smith</Text>
          <View style={profileStyles.activeIndicatorContainer}>
            <Text style={profileStyles.activeIndicatorText}>
              account active 1 month
            </Text>
            <View style={profileStyles.activeIndicator}></View>
          </View>
        </View>
      </View>

      <View style={profileStyles.sectionContainer}>
        <Text style={profileStyles.sectionTitle}>Settings</Text>
        <View style={profileStyles.sectionBody}>
          <IconLabelButton
            label="Please confirm your email"
            color="#e52226"
            iconName="mail"
          />
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
  username: {
    fontSize: 30,
    fontWeight: 'bold',
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
