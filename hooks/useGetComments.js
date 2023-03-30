import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants'

import { firebase } from '@react-native-firebase/database';


export const useGetComments = ({ id, selectedTopic, reload }) => {
    const [comments, setComments] = useState()
    const [error, setError] = useState(false)

    const dbRef = firebase.app().database(Constants.DB_NAME).ref(`forum/${selectedTopic}/${id}/comments/`)

    useEffect(() => {
        dbRef
        .once('value')
        .then(snapshot => {
          let rawData = snapshot.val()
          let prettyData = Object.keys(rawData).map(k => ({ ...rawData[k], key: k }))
          setComments(prettyData)
        })
        .catch(err => { console.log(err); setError(err); })
    }, [reload])

    return { comments, error }
}
