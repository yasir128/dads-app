import React, { useEffect, useState } from 'react';
import * as Constants from '../Constants'

import { firebase } from '@react-native-firebase/database';

export const useGetFeaturedArticles = () => {

    const [ featuredArticles, setFeaturedArticles ] = useState()
    const [ featuredArticlesError, setFeaturedArticlesError ] = useState()

    const dbRef = firebase.app().database(Constants.DB_NAME).ref(`featured_articles/`)

    useEffect(() => {
        dbRef
        .once('value')
        .then(snapshot => {
          let rawData = snapshot.val()
          let prettyData = Object.keys(rawData).map(k => ({ ...rawData[k], id: k }))
          setFeaturedArticles(prettyData)
        })
        .catch(err => { console.log(err); setFeaturedArticlesError(err); })
    }, [])

    return { featuredArticles, featuredArticlesError }
}
