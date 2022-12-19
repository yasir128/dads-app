import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import {UserContext} from '../App'

import Icon from 'react-native-vector-icons/FontAwesome5';

const mockRowData = [
  {
    label: 'libero quisque dictumst fames',
    type: 'REDDIT',
  },
  {
    label: 'nec vehicula fringilla dolor',
    type: 'TWITTER',
  },
  {
    label: 'fames nibh in vivamus',
    type: 'REDDIT',
  },
  {
    label: 'non mi dapibus hendrerit',
    type: 'TWITTER',
  },
  {
    label: 'curabitur libero sem sapien',
    type: 'REDDIT',
  },
  {
    label: 'suspendisse felis eget dictum',
    type: 'ARTICLE',
  },
  {
    label: 'ligula molestie tempus est',
    type: 'TWITTER',
  },
  {
    label: 'egestas aptent tortor nulla',
    type: 'REDDIT',
  },
  {
    label: 'vivamus congue aenean lorem',
    type: 'TWITTER',
  },
  {
    label: 'eleifend ante turpis porta',
    type: 'ARTICLE',
  },
];

const iconAndColorFromType = (type) => {
  switch (type) {
    case 'REDDIT':
      return { color: '#FF5700', icon: 'reddit' };
    case 'TWITTER':
      return { color: '#0084b4', icon: 'twitter' };
    case 'ARTICLE':
      return { color: '#b6adcc', icon: 'newspaper' };
  }
};

const ClickableBox = ({iconName, color, label, onPress}) => (
  <TouchableOpacity
    onPress={ onPress }
    style={[clickableBoxStyles.container, homeStyles.smallShadowStyles]}>
      <Icon name={iconName} size={50} color={color} />
      <Text style={[clickableBoxStyles.label, { color: color }]}>{label}</Text>
     </TouchableOpacity>
);
const InfoBox = ({ info }) => (
  <View style={[infoBoxStyles.container, homeStyles.bigShadowStyles]}>
    <Icon name="info-circle" size={20} color={'#80af92'} />
    <Text style={infoBoxStyles.text}>{info}</Text>
  </View>
);

const ClickableIconRow = ({ label, iconName, color, isTop }) => (
  <View
    style={[
      homeStyles.smallShadowStyles,
      clickableIconRowStyleSheet.container,
      isTop && { borderTopLeftRadius: 6, borderTopRightRadius: 6 },
    ]}>
    <Icon
      size={15}
      name={iconName}
      style={clickableIconRowStyleSheet.icon}
      color={color}
    />
    <Text style={clickableIconRowStyleSheet.label}>{label}</Text>
  </View>
);

export default function Home({ navigation, route }) {

  const user = React.useContext(UserContext)

  const navigateChat = () => { navigation.navigate('Chats') }

  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.welcomeTextContainer}>
        <Text style={homeStyles.welcomeText}>Welcome back{' '}</Text>
        <Text style={homeStyles.welcomeTextName}>{user.email}</Text>
      </View>

      <ScrollView style={homeStyles.scrollViewContainer}>
        <View style={homeStyles.clickableBoxContainer}>
          <View style={homeStyles.clickableBoxRow}>
            <InfoBox info="82% of mothers have primary custody of their children and 53% collect child support, compared with 29% of men." />
          </View>
          <View style={homeStyles.clickableBoxRow}>
            <View
              style={[
                homeStyles.headerContainer,
                homeStyles.smallShadowStyles,
              ]}>
              <Text style={homeStyles.headerTitle}>Toolbar</Text>
            </View>
          </View>
          <View style={homeStyles.clickableBoxRow}>
            <ClickableBox iconName="balance-scale" color="#e2d7e5" label="legal" />
            <ClickableBox iconName="comment" color="#a497ef" onPress={navigateChat} label="chat" />
          </View>
          <View style={homeStyles.clickableBoxRow}>
            <ClickableIconRow
              iconName="newspaper"
              label="Read latest article by dads"
              color="#a16bdb"
              isTop
            />
          </View>
          {mockRowData.map(({ label, type, link }) => {
            let { color, icon } = iconAndColorFromType(type);
            return (
              <View style={homeStyles.clickableBoxRow}>
                <ClickableIconRow link={link} iconName={icon} label={label} color={color} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const infoBoxStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    marginLeft: 8,
    color: '#5b7766',
  },
});

const clickableBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: 150,
    height: 130,
    margin: 10,
    marginTop: 8,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
   // borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  label: {},
});

const clickableIconRowStyleSheet = StyleSheet.create({
  container: {
    width: '89%',
    display: 'flex',
    flexDirection: 'row',
    padding: 13,
    backgroundColor: '#ffffff',
    marginTop: 1,
  },
  icon: {
    flex: 0.1,
    margin: 3,
  },
  label: {
    fontSize: 15,
    flex: 0.9,
  },
});

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#f9f9f9',
  },
  scrollViewContainer: {
    // marginTop: 80,
    // zIndex: 5,
    overflow: 'hidden',
  },
  welcomeTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    marginTop: 50,
    // position: 'absolute',
    zIndex: -1,
  },
  welcomeText: {
    fontSize: 20,
    color: '#d8d8d8',
  },
  welcomeTextName: {
    fontSize: 18,
    color: '#cecece',
    fontWeight: 'bold',
    marginTop: 1,
  },
  clickableBoxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  clickableBoxRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoContainerStyles: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 100,
  },
  infoStyles: {
    width: '85%',
    height: 50,
    backgroundColor: '#80af92',
  },
  bigShadowStyles: {
    shadowColor: '#919191',
    elevation: 3,
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  smallShadowStyles: {
    shadowColor: '#adadad',
    elevation: 3,
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  headerContainer: {
    width: '90%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 15,
  },
  headerTitle: {
    fontSize: 15,
  },
});
