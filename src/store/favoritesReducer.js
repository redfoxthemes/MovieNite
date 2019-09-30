
 const favoritesReducer = (state, action) => {
    let editedFavorites = [];
    const newFavorite = action.payload;
  let favorites = state.favorites;
    switch (action.type) {
        case 'ADD_FAVORITE':
        if(action.payload !== undefined){
          favorites.push(action.payload);
          return {
                    ...state,
                    favorites,
                  };
        } else {
          return state;
        }
        case 'REMOVE_FAVORITE':
            if(favorites !== undefined){
              Object.values(favorites).forEach(movie => {
                if (movie.imdbID !== action.payload.imdbID) {
                  editedFavorites.push(movie);
                }
              });
              return {
                ...state,
                favorites: editedFavorites,
              };
            } else {
              return state;
            }
        case 'ADD_FAILURE':
            return {
             ...state,
            isAddingError: true,
                    };
        case 'REMOVE_FAILURE':
            return {
             ...state,
            isRemovingError: true,
                              };
      default:
        throw new Error();
    }
  };
  export default favoritesReducer;