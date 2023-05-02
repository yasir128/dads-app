import React, { useState, useEffect } from 'react';

import { useGetListFromFirebaseRef } from './useGetListFromFirebaseRef'

export const useGetFlowcharts = ({ reload }) => {

    const [ flowcharts, setFlowcharts ] = useState()
    const {data, loading, error} = useGetListFromFirebaseRef({ref: 'flowchart/', reload: reload})


    useEffect(() => {
        if (data && !error) {
          setFlowcharts(data.map(f => ({ ...f, flowchart: JSON.parse(f.flowchart) }) ))
        }
    }, [loading])

    return { flowcharts, flowchartsLoading: loading, flowchartsError: error }
}
