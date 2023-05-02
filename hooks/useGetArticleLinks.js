import React, { useEffect, useState } from 'react';
import * as Constants from '../Constants'

import { useGetListFromFirebaseRef } from './useGetListFromFirebaseRef'


export const useGetArticleLinks = () => {


    const { data, loading, error } = useGetListFromFirebaseRef({ref: `articles/`, reload: false })

    return {  articleLinks: data, articleLinksError: error, articleLinksLoading: loading }
}
