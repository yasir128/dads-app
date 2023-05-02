import React, { useState, useEffect } from 'react';
import { Linking, View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';

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
    case 'PODCAST':
        return { color: '#4cd38f', icon: 'headphones' };
  }
};

const ClickableBox = ({iconName, label, onPress, backgroundColor}) => (
  <TouchableOpacity
    onPress={ onPress }
    style={[clickableBoxStyles.container, homeStyles.smallShadowStyles, {backgroundColor: backgroundColor}]}>
      <Icon name={iconName} size={50} color='rgba(0,0,0,0.2)' />
      <Text style={clickableBoxStyles.label}>{label}</Text>
     </TouchableOpacity>
);
const InfoBox = () => {
  const { notifications } = useGlobalNotification()

  return (
    <View style={infoBoxStyles.container}>
      <Icon name="info-circle" size={20} color={'rgba(70,70,70,0.6)'} />
      <Text style={infoBoxStyles.text}>{notifications ? randomChoice(notifications).message : 'Loading...'}</Text>
    </View>
  )
};

const ClickableIconRow = ({ label, link, iconName, color, isTop, type }) => (
  <TouchableOpacity
    disabled={isTop}
    onPress={() => Linking.openURL(link) }
    style={[
      homeStyles.smallShadowStyles,
      clickableIconRowStyleSheet.container,
      isTop && { borderTopLeftRadius: 6, borderTopRightRadius: 6 },
    ]}>
    <View style={clickableIconRowStyleSheet.iconAndTextContainer}>
      <View style={[clickableIconRowStyleSheet.iconContainer, {backgroundColor: color}]}>
        <Icon
          size={15}
          name={iconName}
          style={clickableIconRowStyleSheet.icon}
          color={'rgb(255,255,255)'}
        />
      </View>
      <Text style={clickableIconRowStyleSheet.typeText}>{type}</Text>
    </View>
    <Text style={clickableIconRowStyleSheet.label}>{label}</Text>
  </TouchableOpacity>
);


export default function Home({ navigation, route }) {

  const [user, setUser] = useState();


  const translateHeight = new Animated.Value(0);

  setTimeout(() => Animated.timing(translateHeight, {
    toValue: 1,
    duration: 400,
    useNativeDriver: false
  }).start(), 1000)

  useEffect(() => {
    setUser(auth().currentUser)
  }, [])

  const { articleLinks, articleLinksError, articleLinksLoading } = useGetArticleLinks()

  const navigateUserForum = () => { navigation.navigate('Forum Children', {  selectedTopic: 'User Questions' }) }
  const navigateSuggestions = () => { navigation.navigate('Post', {  selectedTopic: 'General', postId: 'ysuoxzeu' }) }
  const navigateFlowchart = () => { navigation.navigate('Flowchart') }

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView style={homeStyles.scrollViewContainer}>
        <Animated.View
          style={[
            homeStyles.welcomeContainer,
            {
              height: translateHeight.interpolate({inputRange: [0, 0.5, 0.7, 1], outputRange: [100, 100, 100, 200]}),
            }
          ]}>
          <View style={homeStyles.welcomeTextContainer}>
            <Text style={homeStyles.welcomeText}>Welcome back{' '}</Text>
            <Text style={homeStyles.welcomeTextName}>{user && user.displayName}</Text>
          </View>
          <InfoBox />
        </Animated.View>
        <View style={homeStyles.clickableBoxContainer}>
          <View style={homeStyles.clickableBoxRow}>
            <ClickableBox
              iconName="code-branch" backgroundColor="#9880af"
              onPress={navigateFlowchart}
              label="Interactive seperation quiz"
            />
          </View>
          <View style={homeStyles.clickableBoxRow}>
            <ClickableBox
              iconName="hands-helping"
              backgroundColor="#8098af"
              onPress={navigateSuggestions}
              label="Offer feedback"
            />
          </View>
        </View>
        <Text style={homeStyles.clickableIconRowTitle}>Articles and Links</Text>
        <ScrollView
          style={homeStyles.clickableBoxRow}
          horizontal>
          {( articleLinksLoading ) && <ActivityIndicator size={20} color='#54408c'  /> }
          {articleLinks && articleLinks.map(({ label, type, link, id }) => {
            let { color, icon } = iconAndColorFromType(type);
            return (
              <View style={homeStyles.clickableBoxRow} key={id} >
                <ClickableIconRow type={type} link={link} iconName={icon} label={label} color={color} />
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const infoBoxStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    // backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    marginLeft: 8,
    color: 'rgba(70,70,70,0.6)',
    fontStyle: 'italic',
  },
});

const clickableBoxStyles = StyleSheet.create({
  container: {
    width: '90%',
    height: 130,
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    margin: 10,
    borderRadius: 30,
   // borderRadius: 10,
    // borderBottomLeftRadius: 100,
  },
  label: {
    paddingLeft: 20,
    width: '80%',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

const clickableIconRowStyleSheet = StyleSheet.create({
  container: {
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
    backgroundColor: '#ffffff',
    marginTop: 1,
    fontSize: 30,
    borderRadius: 18,
  },
  iconAndTextContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    color: 'rgba(0,0,0,0.3)'
  },
  iconContainer: {
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    margin: 3,
  },
  icon: {
  },
  label: {
    fontSize: 25,
    color: '#919191'
  },
});

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollViewContainer: {
    // marginTop: 80,
    // zIndex: 5,
    overflow: 'hidden',
  },
  welcomeContainer: {
    backgroundColor: '#80af92',
    padding: 30,
    borderBottomLeftRadius: 100,
    margin: 0,
    height: 100,
  },
  welcomeTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    // position: 'absolute',
    zIndex: -1,
  },
  welcomeText: {
    fontSize: 20,
    color: '#d8d8d8',
    paddingLeft: 10,
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
  },
  clickableIconRowTitle: {
    fontSize: 20,
    color: '#cecece',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cecece',
    paddingBottom: 5,
  },
  clickableBoxRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
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
