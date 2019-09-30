//custom hook for useEffect
import React, { Fragment, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import movieReducer from '../store/movieReducer';
const useOMDApi = () => {
    //TODO: change to url with API key only and pass query parameter from the form
    const [url, setUrl] = useState(
      `http://www.omdbapi.com/?apikey=68ac16ce`,
    );
    const [state, dispatch] = useReducer(movieReducer, {
      isLoadingError: false,
      data: {},
    });
    
    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: 'LOAD_INIT' });
        try {
          const result = await axios(url);
          dispatch({ type: 'LOAD_COMPLETE', payload: result.data });
        } catch (error) {
          dispatch({ type: 'LOAD_FAILURE' });
        }
      };
      fetchData();
    }, [url]);
    return [state, setUrl];
  }
  export default useOMDApi;