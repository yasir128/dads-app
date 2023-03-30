import React, { useLayoutEffect } from 'react';
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
  Dimensions
} from 'react-native';
import useState from 'react-usestateref';

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
    width: Dimensions.get('window').width * 0.9,
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

  const [query, setQuery, queryRef] = useState('')


  const {posts, postsError, postsLoading} = useGetPostsFromTopic({selectedTopic: route.params.selectedTopic, query: queryRef.current})

  const onPostPressed = (index) => {
    navigation.navigate('Post', {postId: posts[index].key, selectedTopic: route.params.selectedTopic })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <SearchBar onSearching={ t => setQuery(t) } placeholder="Search for a post" style={{height: 50, width: 250}} iconSize={15} />,
    })
  }, [])

  return (
    <View>
      <View style={forumChildrenStyles.container}>
          { postsLoading && <ActivityIndicator size={30} color='#11798e' style={{ marginTop: 100 }} /> }
          <View style={forumChildrenStyles.flatListContainer}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={posts}
            scrollEnabled={true}
            renderItem={({ item, index }) => <PostThumbnail {...item} index={index} onPress={onPostPressed} />}
          />
          </View>

        <TouchableOpacity
        onPress={() => navigation.navigate('Forum Post', { selectedTopic: route.params.selectedTopic })}
        style={forumChildrenStyles.addPostContainer}>
          <Text style={forumChildrenStyles.addPostText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

const forumChildrenStyles = StyleSheet.create({

  container: {
    height: '100%',
    marginTop: 30,
  },

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
    bottom: 70,
    right: 12,
    zIndex: 100,
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
  flatListContainer: {
    marginTop: 30,
    display: 'flex',
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: 55,
  },
})
