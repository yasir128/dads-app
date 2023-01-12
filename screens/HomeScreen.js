import React, { useState, useEffect } from 'react';
import { Linking, View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import auth from '@react-native-firebase/auth';

import {UserContext} from '../App'
import { useGlobalNotification } from '../hooks/useGlobalNotification'
import { useGetArticleLinks } from '../hooks/useGetArticleLinks'

import { randomChoice } from '../helperFunctions/randomGen'

import Icon from 'react-native-vector-icons/FontAwesome5';

const iconAndColorFromType = (type) => {
  switch (type) {
    case 'REDDIT':
      return { color: '#FF5700', icon: 'reddit' };
    case 'TWITTER':
      return { color: '#0084b4', icon: 'twitter' };
    case 'ARTICLE':
      return { color: '#b6adcc', icon: 'newspaper' };
    case 'OTHER':
      return { color: '#285d70', icon: 'link' };
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
const InfoBox = () => {
  const { notifications } = useGlobalNotification()

  return (
    <View style={[infoBoxStyles.container, homeStyles.bigShadowStyles]}>
      <Icon name="info-circle" size={20} color={'#80af92'} />
      <Text style={infoBoxStyles.text}>{notifications ? randomChoice(notifications).message : 'Loading...'}</Text>
    </View>
  )
};

const ClickableIconRow = ({ label, link, iconName, color, isTop }) => (
  <TouchableOpacity
    disabled={isTop}
    onPress={() => Linking.openURL(link) }
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
  </TouchableOpacity>
);

export default function Home({ navigation, route }) {

  const [user, setUser] = useState();

  useEffect(() => { setUser(auth().currentUser) }, [])

  const { articleLinks, articleLinksError, articleLinksLoading } = useGetArticleLinks()

  const navigateUserForum = () => { navigation.navigate('Forum Children', {  selectedTopic: 'User Questions' }) }
  const navigateFlowchart = () => { navigation.navigate('Flowchart') }

  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.welcomeTextContainer}>
        <Text style={homeStyles.welcomeText}>Welcome back{' '}</Text>
        <Text style={homeStyles.welcomeTextName}>{user && user.displayName}</Text>
      </View>

      <ScrollView style={homeStyles.scrollViewContainer}>
        <View style={homeStyles.clickableBoxContainer}>
          <View style={homeStyles.clickableBoxRow}>
            <InfoBox />
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
            <ClickableBox iconName="code-branch" color="#e2d7e5" label="flowchart" onPress={navigateFlowchart} />
            <ClickableBox iconName="hands-helping" color="#a497ef" onPress={navigateUserForum} label="user questions" />
          </View>
          <View style={homeStyles.clickableBoxRow}>
            <ClickableIconRow
              iconName="newspaper"
              label={!articleLinksError ? "Read latest article by dads" : "Error loaidng articles"}
              color="#a16bdb"
              isTop
            />
          </View>
          {( articleLinksLoading ) && <ActivityIndicator size={20} color='#54408c'  /> }
          {articleLinks && articleLinks.map(({ label, type, link, id }) => {
            let { color, icon } = iconAndColorFromType(type);
            return (
              <View style={homeStyles.clickableBoxRow} key={id} >
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
    color: '#919191'
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
    color: '#aaa7b2'
  },
});
