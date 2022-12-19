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
  TouchableOpacity
} from 'react-native';
import SearchBar from '../components/SearchBar'
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { firebase } from '@react-native-firebase/database';

import * as Constants from '../Constants'


const PostThumbnail = ({ title, detail, date }) => (
  <TouchableOpacity style={postThumbnailStyles.container}>
    <View style={postThumbnailStyles.detailContainer}>
      <Text style={postThumbnailStyles.title}>{title}</Text>
      <Text style={postThumbnailStyles.detail} multiline>{detail.substr(0, 70)}...</Text>
    </View>
    <Text style={postThumbnailStyles.date}>{date}</Text>
  </TouchableOpacity>
)

const postThumbnailStyles = StyleSheet.create({
  container: {
    width: 330,
    overflow: 'hidden',
    // borderBottomWidth: 1,
    // borderBottomColor: '#848484',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 4,
    backgroundColor: 'rgba(204,229,232, 0.5)',
    borderRadius: 7,
  },
  detailContainer: {
    display: 'flex',
  },
  title: {
    color: '#646654',
    fontSize: 20,
  },
  detail: {
    width: 230,
    color: '#a5a5a5'
  },
  date: {
  },
})


export default function ForumChildren({ route, navigation }) {
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(true)

  const dbRef = firebase.app().database(Constants.DB_NAME).ref('/forum/' + route.params.selectedTopic)

  useEffect(() => {
    dbRef
    .once('value')
    .then(snapshot => {
      let rawData = snapshot.val()
      let posts = Object.keys(rawData).map(k => ({ ...rawData[k] }) )
      setPosts(posts)
      setLoading(false)
    })
    .catch(err => { console.log(err); setLoading(false) })
  }, [])

  return (
    <View style={forumChildrenStyles.container}>
      <SearchBar />
      <ScrollView>
        { loading && <ActivityIndicator size={30} color='#11798e' /> }
        <View style={forumChildrenStyles.flatListContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={posts}
          renderItem={(item) => <PostThumbnail {...item.item} />}
        />
        </View>

      </ScrollView>
    </View>
  )

}

const forumChildrenStyles = StyleSheet.create({
  container: {},
  flatListContainer: {
    marginTop: 30,
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
})
