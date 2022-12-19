import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchBar from '../components/SearchBar'

import { firebase } from '@react-native-firebase/database';

import { generateID } from '../helperFunctions/randomGen'
import * as Constants from '../Constants'

const sectionHeaderStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    padding: 20,
    paddingBottom: 30,
    paddingTop: 30,
    backgroundColor: 'rgba(207, 234, 233, 1)',
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#490100',
  },
  right: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
});



const featuredArticleStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    position: 'relative',
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 300,
  },
  title: {
    position: 'absolute',
    top: 130,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(161,174,226,0.5)',
    textAlign: 'left',
    fontSize: 18,
    padding: 5,
    paddingTop: '27%',
    color: '#404766',
    fontWeight: 'bold',
  },
});

export default function ForumHome({ navigation, route }) {
  const [mainTopics, setMainTopics] = useState([])
  const [loading, setLoading] = useState(true)

  const dbRef = firebase.app().database(Constants.DB_NAME).ref('/forum')

  const onTopicSelected = (title) => {
    navigation.navigate('Forum Children', { selectedTopic: title })
  };

  useEffect(() => {
    console.log("USe effecting")
    dbRef
      .once('value')
      .then(snapshot => {
        setLoading(false)
        let rawData = snapshot.val()
        let data = Object.keys(rawData).map(k => ({ title: k, id: generateID(Constants.ID_LENGTH) }) )
        console.log(data)
        setMainTopics( data )
      })
      .catch(err => {
        console.log("ERROR", err)
        setLoading(false)
      })

  }, [])

  const SectionHeader = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[sectionHeaderStyles.container, legalStyles.shadowStyles]}>
      <Text style={sectionHeaderStyles.title}>{title}</Text>
      <Icon
        style={sectionHeaderStyles.right}
        name="arrow-right"
        size={20}
        color="#fcfcfc"
      />
    </TouchableOpacity>
  );

  const FeaturedArticle = ({ title, imageUri }) => (
    <View style={[featuredArticleStyles.container, legalStyles.shadowStyles]}>
      <Image style={featuredArticleStyles.image} source={{ uri: imageUri }} />
      <Text style={featuredArticleStyles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={legalStyles.container}>
      <SearchBar />
      <ScrollView style={legalStyles.sectionsContainer}>
        <ScrollView style={legalStyles.featuredArticleContainer} horizontal>
          <FeaturedArticle
            title="Dads Rights: the rise of firms"
            imageUri={
              'https://i.guim.co.uk/img/media/83882f4ccd86755bd7731946d0cf19212b8a2f33/0_0_4992_2995/master/4992.jpg?width=620&quality=45&fit=max&dpr=2&s=e8d8f593e4038d8c0a37afba0d436a51'
            }
          />
          <FeaturedArticle
            title="How to survive divorce"
            imageUri={
              'https://i.guim.co.uk/img/media/428287140488fd11d87350340cb0929d7855cc85/0_0_1280_768/master/1280.jpg?width=620&quality=45&fit=max&dpr=2&s=c7abe4b381cd4648a7c418a8034e0f48'
            }
          />
          <FeaturedArticle
            title="Dads Rights: the rise of firms"
            imageUri={
              'https://i.guim.co.uk/img/media/83882f4ccd86755bd7731946d0cf19212b8a2f33/0_0_4992_2995/master/4992.jpg?width=620&quality=45&fit=max&dpr=2&s=e8d8f593e4038d8c0a37afba0d436a51'
            }
          />
          <FeaturedArticle
            title="Dads Rights: the rise of firms"
            imageUri={
              'https://i.guim.co.uk/img/media/83882f4ccd86755bd7731946d0cf19212b8a2f33/0_0_4992_2995/master/4992.jpg?width=620&quality=45&fit=max&dpr=2&s=e8d8f593e4038d8c0a37afba0d436a51'
            }
          />
        </ScrollView>

        { loading && <ActivityIndicator size={30} color='#11798e' /> }

        <FlatList
          keyExtractor={(item) => item.id}
          data={mainTopics}
          renderItem={(item) => <SectionHeader {...item.item} onPress={() => onTopicSelected(item.item.title)} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const legalStyles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  sectionsContainer: {
    marginBottom: 80,
  },
  shadowStyles: {
    shadowColor: '#919191',
    elevation: 3,
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  featuredArticleContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
