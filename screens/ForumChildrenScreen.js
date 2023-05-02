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
  Dimensions,
  Animated
} from 'react-native';
import useState from 'react-usestateref';

import SearchBar from '../components/SearchBar'
// import Icon from 'react-native-vector-icons/FontAwesome5';

import { firebase } from '@react-native-firebase/database';

import {useGetPostsFromTopic} from '../hooks/useGetPostsFromTopic'

import * as Constants from '../Constants'

import dateFormat from '../helperFunctions/dateFormat'

const TimeStamp = ({ d }) => (
    <Text style={{ color: '#000000', fontSize: 10, fontWeight: '300' }}>{ d ? dateFormat(new Date(d), 'DD/MM/YYYY') : '' }</Text>
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
    width: Dimensions.get('window').width * 0.92,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    padding: 25,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(255,255,255)',
    // backgroundColor: '#264653',
    // backgroundColor: randomChoice(niceColorList),
    // SHADOW
    shadowColor: '#7c7f7d',
    elevation: 3,
    shadowOffset: { width: -4, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,
    // borderBottomWidth: 1,
    // backgroundColor: 'rgba(204,229,232, 0.5)',
  },
  detailContainer: {
    display: 'flex',
  },
  title: {
    color: '#42603e',
    fontSize: 30,
    fontWeight: '200',
  },
  detail: {
    width: 230,
    color: 'rgba(0,0,0,0.3)'
  },
  timeStampContainer: {
    // alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
})


export default function ForumChildren({ route, navigation }) {

  const [query, setQuery, queryRef] = useState('')
  const {posts, postsError, postsLoading} = useGetPostsFromTopic({selectedTopic: route.params.selectedTopic, query: queryRef.current})

  const scrollY = new Animated.Value(0);

  const onPostPressed = (index) => {
    navigation.navigate('Post', {postId: posts[index].key, selectedTopic: route.params.selectedTopic })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <SearchBar onSearching={ t => setQuery(t) } placeholder="Search for a post" style={{height: 50, width: 290}} iconSize={15} />,
    })
  }, [])

  return (
    <View>
      <View style={forumChildrenStyles.container}>
          { postsLoading && <ActivityIndicator size={30} color='#11798e' style={{ marginTop: 100 }} /> }
          <View style={forumChildrenStyles.flatListContainer}>
          <Animated.FlatList
            keyExtractor={(item) => item.id}
            data={posts}
            scrollEnabled={true}
            renderItem={({ item, index }) => <PostThumbnail {...item} index={index} onPress={onPostPressed} />}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true },
            )}
          />
          </View>

        <TouchableOpacity
        onPress={() => navigation.navigate('Forum Post', { selectedTopic: route.params.selectedTopic })}
        style={[forumChildrenStyles.addPostContainer,
          {transform: [ // Hide add button onScroll
            {
              translateX: scrollY.interpolate({
                inputRange: [0, Dimensions.get('window').height],
                outputRange: [0, 500]
              })
            }
          ]}
        ]}
        >
          <Text style={forumChildrenStyles.addPostText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

/*
[
  {transform: [
    {translateX: scrollY.interpolate({
      inputRange: [0, Dimensions.get('window').height],
      outputRange: [0, 5]
    })}
  ]}
]
*/

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
