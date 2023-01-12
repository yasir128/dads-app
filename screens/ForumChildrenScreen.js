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

import {useGetPostsFromTopic} from '../hooks/useGetPostsFromTopic'

import * as Constants from '../Constants'

import dateFormat from '../helperFunctions/dateFormat'


const TimeStamp = ({ d }) => (
    <Text style={{ color: '#828282', fontSize: 10, }}>{ d ? dateFormat(new Date(d), 'DD-MM-YYYY') : '' }</Text>
)

const PostThumbnail = ({ title, detail, date, index, onPress }) => (
  <TouchableOpacity onPress={() => onPress(index)} style={[postThumbnailStyles.container, index==0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
    <View style={postThumbnailStyles.detailContainer}>
      <Text style={postThumbnailStyles.title}>{title}</Text>
      <Text style={postThumbnailStyles.detail} multiline>{detail.substr(0, 70)}...</Text>
    </View>

    <View style={postThumbnailStyles.timeStampContainer}><TimeStamp d={date} /></View>
  </TouchableOpacity>
)

const postThumbnailStyles = StyleSheet.create({
  container: {
    width: 330,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 1,
    backgroundColor: 'rgba(204,229,232, 0.5)',
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
  timeStampContainer: {
    alignSelf: 'flex-end',
    marginLeft: 25,
  },
})


export default function ForumChildren({ route, navigation }) {
  const {posts, postsError, postsLoading} = useGetPostsFromTopic({selectedTopic: route.params.selectedTopic})

  const onPostPressed = (index) => {
    navigation.navigate('Post', {postId: posts[index].key, selectedTopic: route.params.selectedTopic })
  }

  return (
    <View style={forumChildrenStyles.container}>
      <SearchBar />
      <ScrollView>
        { postsLoading && <ActivityIndicator size={30} color='#11798e' /> }
        <View style={forumChildrenStyles.flatListContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={posts}
          renderItem={({ item, index }) => <PostThumbnail {...item} index={index} onPress={onPostPressed} />}
        />
        </View>
      </ScrollView>
      <TouchableOpacity
      onPress={() => navigation.navigate('Forum Post', { selectedTopic: route.params.selectedTopic })}
      style={forumChildrenStyles.addPostContainer}>
        <Text style={forumChildrenStyles.addPostText}>+</Text>
      </TouchableOpacity>
    </View>
  )

}

const forumChildrenStyles = StyleSheet.create({

  addPostText: {
    fontSize: 40,
    color: 'white',
    paddingBottom: 2,
  },
  addPostContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 12,
    backgroundColor: '#6359a0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //SHADOW
    shadowColor: '#020202',
    elevation: 3,
    shadowOffset: { width: -4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },

  container: {
    height: '100%',
  },
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
