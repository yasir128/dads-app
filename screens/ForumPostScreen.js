import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { firebase } from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Markdown from 'react-native-markdown-display';

import Avatar from '../components/Avatar'
import {useGetComments} from '../hooks/useGetComments'
import {useGetPostFromId} from '../hooks/useGetPostFromId'


import * as Constants from '../Constants'
import {UserContext} from '../App'
import { generateID } from '../helperFunctions/randomGen'


const AddComment = ({ onPostComment, loading, error }) => {

  const [commentInputText, setCommentInputText] = useState()

  const onPost = () => {
    onPostComment(commentInputText)
    setCommentInputText('')
  }

  return (
    <View style={addCommentStyles.containerContainer}>
      <View style={addCommentStyles.container}>
        <View style={addCommentStyles.avatarContainer}><Avatar size={30} /></View>
        <TextInput
          value={commentInputText}
          onChangeText={(t) => setCommentInputText(t)}
          placeholderTextColor={'#b2b2b2'}
          multiline placeholder="start typing a comment..." style={addCommentStyles.textInput}
        />
        { error && <Text style={addCommentStyles.error}>Error posting comment, try again later</Text> }
        { loading ?
          ( <ActivityIndicator size={20} color='#319b5c' /> ) :
          (
            <TouchableOpacity style={addCommentStyles.sendIconContainer} onPress={onPost}>
              <Icon name="location-arrow" color='#ffffff' size={18} />
            </TouchableOpacity>
          )}
      </View>
    </View>
  )
}
const addCommentStyles = StyleSheet.create({
  containerContainer: {
    //backgroundColor: '#eaeaea',
    borderColor: '#d9dddb',
    borderWidth: 1,
    borderRadius: 20,
    paddingRight: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    margin: 10,
  },
  textInput: {
    margin: 0,
    padding: 0,
    borderBottomColor: '#319b5c',
    borderBottomWidth: 1,
    padding: 5,
    width: '90%',
    color: '#000000'
  },
  sendIconContainer: {
    borderRadius: 25,
    backgroundColor: '#319b90',
    width: 30,
    height: 30,
    padding: 6,
  },
  error: {
    color: '#d11037',
    margin: 10,
    position: 'absolute',
    bottom: 30,
  },
})

const Comment = ({ comment, date, user, }) => (
  <View style={commentStyles.containerContainer}>
  <View style={commentStyles.container}>
    <View style={commentStyles.avatarContainer}><Avatar size={30} /></View>
    <Text style={commentStyles.commentText}>{comment}</Text>
  </View>
  </View>
)


const commentStyles = StyleSheet.create({
  containerContainer: {
    backgroundColor: '#eaeaea',
    borderRadius: 50,
    paddingRight: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    margin: 10,
  },
  avatarContainer: {
    margin: 10,
  },
  commentText: {
    marginTop: 15,
    color: '#000000'
  },
})

export default function ForumPost({ navigation, route }) {

  const user = React.useContext(UserContext)
  const { id, title, detail, postLoading, postError } = useGetPostFromId({id: route.params.postId, selectedTopic: route.params.selectedTopic})

  const [reload, setReload] = useState(false)

  const { comments, error } = useGetComments({id: route.params.postId, selectedTopic: route.params.selectedTopic, reload: reload})

  const [postCommentError, setPostCommentError] = useState()
  const [postCommentLoading, setPostCommentLoading] = useState()

  const onPostComment = ( commentText ) => {
      let commentId = generateID(10)
      let dbRef = firebase.app().database(Constants.DB_NAME).ref(`forum/${route.params.selectedTopic}/${id}/comments/${commentId}`)

      setPostCommentLoading(true)

      dbRef.set({comment: commentText, date: Date.now(), user: user.uid})
      .then(() => {setPostCommentLoading(false); console.log("success"); setReload(true); } )
      .catch((err) => { console.log("err", error); setPostCommentLoading(false); setPostCommentError(err);  })
  }

  return (
    <SafeAreaView style={forumPostStyles.container}>
    <ScrollView>
      <View style={forumPostStyles.postContainer}>
          <View style={forumPostStyles.postTitleContainer}>
            <View style={forumPostStyles.avatarContainer}><Avatar size={50} /></View>
            <Text style={forumPostStyles.postTitle}>{postLoading ? "Loading..." : title}</Text>
          </View>
          <View
            contentInsetAdjustmentBehavior="automatic">
            <View>
              <View style={forumPostStyles.postDetailContainer}>
                {postError && <Text style={forumPostStyles.errorText}>{postError.message}</Text>}
                <Markdown style={{ body: { color: '#000000' } }}>
                  {postLoading ? "" : detail}
                </Markdown>
              </View>
            </View>
          </View>

          <View style={forumPostStyles.commentsContainer}>
            <Text style={forumPostStyles.commentsTitle}>Comments</Text>

            <AddComment onPostComment={onPostComment} loading={postCommentLoading} error={postCommentError} />

            <View>
              {comments && comments.map(c => (
                <Comment {...c}  />
              ))}
            </View>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const forumPostStyles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  postContainer: {
    margin: 10,
    padding: 10,
  },
  postTitleContainer: {
    flexDirection: 'row',
    borderBottomColor: '#b3d3c0',
    borderBottomWidth: 2,
    margin: 10,
    marginTop: 0,
  },
  avatarContainer: {
    justifyContent: 'center',
  },
  postTitle: {
    color: '#555e59',
    fontSize: 30,
    margin: 5,
    padding: 8,
  },
  postDetailContainer: {
    padding: 8,
  },
  commentsContainer: {
    margin: 10,
  },
  commentsTitle: {
    color: '#8e8e8e',
    fontSize: 15,
    borderTopWidth: 1,
    borderTopColor: '#8e8e8e',
    paddingTop: 15,
  },
});
