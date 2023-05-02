import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants'

import { firebase } from '@react-native-firebase/database';


export const useGetListFromFirebaseRef = ({ ref, reload }) => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const dbRef = firebase.app().database(Constants.DB_NAME).ref(ref)

    useEffect(() => {
        dbRef
        .orderByChild('date')
        .once('value')
        .then(snapshot => {
          let rawData = snapshot.val()
          let prettyData = Object.keys(rawData).map(k => ({ ...rawData[k], key: k }) )
          setData(prettyData)
          setLoading(false)
        })
        .catch(err => { setError(err); setLoading(false); })
    }, [reload])

    return { data, loading, error }
}
