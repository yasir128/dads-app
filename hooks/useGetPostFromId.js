import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants'

import { useGetQueriedListFromFirebaseRef } from './useGetQueriedListFromFirebaseRef'

export const useGetPostFromId = ({ selectedTopic, id, reload }) => {

    const [post, setPost] = useState()

    const { data, loading, error } = useGetQueriedListFromFirebaseRef({ ref: `forum/${selectedTopic}/`, query: id, child: 'id', reload: reload })

    useEffect(() => {
      if (data && !error) {
        setPost(data[0]);
      }
    }, [loading])

    return {  ...post, postError: error, postLoading: loading }
}
