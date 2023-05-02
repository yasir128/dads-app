import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants'

import { firebase } from '@react-native-firebase/database';


export const useGetQueriedListFromFirebaseRef = ({ ref, query, child, reload }) => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const dbRef = firebase.app().database(Constants.DB_NAME).ref(ref)

    console.log("Args", query, child, ref)


    useEffect(() => {
        dbRef
        .orderByChild(child)
        .startAt(query)
        .endAt(query + "\uf8ff")
        .once('value')
        .then(snapshot => {
          let rawData = snapshot.val()
          console.log("rawData", rawData)
          let prettyData = Object.keys(rawData).map(k => ({ ...rawData[k], key: k }) )
          setData(prettyData)
          setLoading(false)
        })
        .catch(err => { setError(err); setLoading(false); })
    }, [reload, query])

    return { data, loading, error }
}
