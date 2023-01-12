import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants'

import { firebase } from '@react-native-firebase/database';

export const useGlobalNotification = ( ) => {
    const [notifications, setNotifications] = useState()

    const dbRef = firebase.app().database(Constants.DB_NAME).ref('/global_notification/')


    useEffect(() => {
        dbRef
        .once('value')
        .then(snapshot => {
          let rawData = snapshot.val()
          let prettyData = Object.keys(rawData).map(k => ({ ...rawData[k], id: k }))
          setNotifications(prettyData)
        })
        .catch(err => { console.log(err); setNotifications([{message: "Error loading notifications :("}]) })
    }, [])

    return { notifications }
}
