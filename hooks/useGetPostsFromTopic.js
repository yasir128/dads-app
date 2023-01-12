import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants'

import { useGetListFromFirebaseRef } from './useGetListFromFirebaseRef'

export const useGetPostsFromTopic = ({ selectedTopic, reload }) => {

    const { data, loading, error } = useGetListFromFirebaseRef({ref: `forum/${selectedTopic}/`, reload: reload })

    return { posts: data, postsError: error, postsLoading: loading }
}
