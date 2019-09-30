//custom hook for useEffect
import React, { Fragment, useState, useEffect, useReducer } from 'react';
import favoritesReducer from '../store/favoritesReducer';
const useFavorites = () => {
    const [favorite, setFavorite] = useState();
    const [actionRequired, setActionRequired] = useState();
    const [state, dispatch] = useReducer(favoritesReducer, {
      showFavorites: false,
      isAddingError: false,
      isRemovingError: false,
      favorites: [],
    });
    useEffect(() => {
      switch(actionRequired){
        case 'add':
            try {
              dispatch({ type: 'ADD_FAVORITE', payload: favorite });
              //TODO: add WebAPI call here
            } catch (error) {
              dispatch({ type: 'ADD_FAILURE' });
            }
            break;
        case 'remove':
            try {
              dispatch({ type: 'REMOVE_FAVORITE', payload: favorite });
              //TODO: add WebAPI call here
            } catch (error) {
              dispatch({ type: 'REMOVE_FAILURE' });
            }
  
      }
   }, [favorite, actionRequired]);
    return [state, setFavorite, setActionRequired];
  }

  export default useFavorites;