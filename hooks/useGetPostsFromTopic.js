import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants'

import { useGetQueriedListFromFirebaseRef } from './useGetQueriedListFromFirebaseRef'

export const useGetPostsFromTopic = ({ selectedTopic, query, reload  }) => {

    const { data, loading, error } = useGetQueriedListFromFirebaseRef({ref: `forum/${selectedTopic}/`, child: 'title', reload: reload, query: query })

    return { posts: data, postsError: error, postsLoading: loading }
}
