import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import { firebase } from '@react-native-firebase/database';
import {UserContext} from '../App'
import * as Constants from '../Constants'
import { generateID } from '../helperFunctions/randomGen'

import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
// import Icon from 'react-native-vector-icons/Entypo';


export default function UserForumPost({ navigation, route }) {

  const user = React.useContext(UserContext)

  const [title, setTitle] = useState()
  const [detail, setDetail] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const [acceptedTC, setAcceptedTC] = useState(false)


  const onPost = () => {
    setLoading(true)

    let postId = generateID(10)

    const dbRef = firebase.app().database(Constants.DB_NAME).ref(`/forum/${route.params.selectedTopic}/${postId}`)

    dbRef.set({date: Date.now(), title: title, detail: detail, user: user.uid})
    .then(() => {
      setLoading(false);
      navigation.navigate('Forum Home', {postId: postId})
    })
    .catch(err => { setError(err.message); setLoading(false) })
  }

  return (
    <SafeAreaView style={userPostStyles.container}>
      <ScrollView style={userPostStyles.inputsContainer}>
        <View style={userPostStyles.titleInputContainer}>
          <TextInput
          multiline
          placeholderTextColor="#cecece"
          style={userPostStyles.titleInput}
          placeholder="Start typing a title for your post..." onChangeText={t => setTitle(t)}  />
        </View>

        <ScrollView style={userPostStyles.detailInputContainer}>
          <TextInput
          placeholderTextColor="#bcbcbc"
          style={userPostStyles.detailInput}
          onChangeText={t => setDetail(t)}
          placeholder="Start writing a post here. You can use markdown to add bold, italics, links, headings and more to elevate your posts!"
          multiline  />
        </ScrollView>

        <View style={userPostStyles.checkboxContainer}>
          <Checkbox isChecked={acceptedTC} onPress={() => setAcceptedTC(p => !p)} title="Agree to" />
          <TouchableOpacity
            onPress={() => navigation.navigate('Post', {postId: 'ixkfhi', selectedTopic: 'General' })}
            style={userPostStyles.TCLink}>
            <Text style={userPostStyles.TCText}>T&Cs</Text>
          </TouchableOpacity>
        </View>


        {loading ?
          <ActivityIndicator color="#251970" size={30} /> :
          <Button onPress={onPost} disabled={!title || !detail || error || !acceptedTC} buttonTitle="Post" color="#5d4cb2" />
        }

        {error && <Text style={userPostStyles.errorText}>{error}</Text> }

      </ScrollView>
    </SafeAreaView>
  );
}



const userPostStyles = StyleSheet.create({

  TCLink: {
    position: 'absolute',
    left: 105,
    bottom: 2,
  },
  TCText: {
    color: '#514adb',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
  },

  checkboxContainer: {
    margin: 10,
    // display: 'flex',
    flexDirection: 'row',
  },

  container: {
    marginTop: 50,
  },
  inputsContainer: {
    margin: 15,
  },
  titleInputContainer: {
    marginBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#597c67'
  },
  titleInput: {
    fontSize: 22,
    color:'black'
  },
  detailInputContainer: {
    height: 450,
    backgroundColor: '#e2e2e2',
    padding: 5,
    marginBottom: 20,
    borderRadius: 10,

    // SHADOW
      shadowColor: '#919191',
    elevation: 3,
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  detailInput: {
    padding: 15,
    color: 'black',
  },
  errorText: {
    color: '#872e2c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
