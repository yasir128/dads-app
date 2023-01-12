import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants'

import { useGetPostsFromTopic } from './useGetPostsFromTopic'

export const useGetPostFromId = ({ selectedTopic, id, reload }) => {

    const [post, setPost] = useState()

    const { posts, postsError, postsLoading } = useGetPostsFromTopic({ selectedTopic: selectedTopic, reload: reload })

    useEffect(() => {
      if (posts && !postsError) {
        setPost(posts.filter(p => (p.id === id) || (p.key === id) )[0])

        console.log(posts)
      }
    }, [postsLoading])

    return {  ...post, postError: postsError, postLoading: postsLoading }
}
