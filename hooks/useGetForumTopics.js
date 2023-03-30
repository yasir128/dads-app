import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants'

import { firebase } from '@react-native-firebase/database';

export const useGetForumTopics = ({ reload, query }) => {

    const [topics, setTopics] = useState([])
    const [topicsError, setTopicsError] = useState()
    const [topicsLoading, setTopicsLoading] = useState(true)

    const dbRef = firebase.app().database(Constants.DB_NAME).ref('/forum')

    useEffect(() => {

      if (query) { // Jammy fix to showing all topics when no query
        dbRef
          .orderByKey()
          .startAt(query)
          .endAt(query + "\uf8ff")
          .once('value')
          .then(snapshot => {
            let rawData = snapshot.val()
            let data = Object.keys(rawData).map(k => ({ title: k, id: 'asdf' }) )
            setTopics( data )
            setTopicsLoading(false)
          })
          .catch(err => {
            setTopicsError(err)
            setTopicsLoading(false)
          })
      }

      else if (query == "") {
      dbRef
        .once('value')
        .then(snapshot => {
          let rawData = snapshot.val()
          let data = Object.keys(rawData).map(k => ({ title: k, id: 'asdf' }) )
          setTopics( data )
          setTopicsLoading(false)
        })
        .catch(err => {
          setTopicsError(err)
          setTopicsLoading(false)
        })
      }

    }, [reload, query])


    return {  topics, topicsError, topicsLoading, topicsLoading }
}
