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
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchBar from '../components/SearchBar'

import {useGetFeaturedArticles} from '../hooks/useGetFeaturedArticles'

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
    color: '#828282',
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
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0.6,
    textAlign: 'left',
    fontSize: 30,
    padding: 5,
    paddingTop: '27%',
    color: '#f7f9fc',
    fontWeight: 'bold',
  },
});

export default function ForumHome({ navigation, route }) {
  const [mainTopics, setMainTopics] = useState([])
  const [loading, setLoading] = useState(true)

  const { featuredArticles, featuredArticlesError } = useGetFeaturedArticles()

  const dbRef = firebase.app().database(Constants.DB_NAME).ref('/forum')


  const onTopicSelected = (title) => {
    navigation.navigate('Forum Children', { selectedTopic: title })
  };


  useEffect(() => {

    dbRef
      .once('value')
      .then(snapshot => {
        setLoading(false)
        let rawData = snapshot.val()
        let data = Object.keys(rawData).map(k => ({ title: k, id: generateID(Constants.ID_LENGTH) }) )
        setMainTopics( data )
      })
      .catch(err => {
        console.log(err)
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

  const FeaturedArticle = ({ title, imageUri, link, backgroundColor, postId, topic }) => (
    <TouchableOpacity
      onPress={() => {
        if (link) Linking.openURL(link)
        else navigation.navigate('Post', {postId: postId, selectedTopic: topic})
      }}
      style={[featuredArticleStyles.container, legalStyles.shadowStyles]}>
      <Image style={featuredArticleStyles.image} source={{ uri: imageUri }} blurRadius={10} />
      <Text style={[featuredArticleStyles.title, {backgroundColor: backgroundColor || '#65676b'}]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={legalStyles.container}>
      <SearchBar />
      <ScrollView style={legalStyles.sectionsContainer}>
        <ScrollView style={legalStyles.featuredArticleContainer} horizontal>
          { featuredArticles
            ? featuredArticles.map(fA =>   <FeaturedArticle { ...fA } />)
            : <ActivityIndicator size={30} color='#11798e' /> }
          {featuredArticlesError && <Text style={legalStyles.errorText}>{featuredArticlesError}</Text>}
        </ScrollView>


        <Text style={legalStyles.forumTitleText}>Forums</Text>

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
  errorText: {
    color: '#872e2c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
  forumTitleText: {
    fontSize: 20,
    color: '#cecece',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cecece',
    paddingBottom: 5,
  },
});
