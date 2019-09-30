import React, { Fragment, useState, useEffect, useReducer } from 'react';
import { Button, Paper } from '@material-ui/core';

import useOMDApi from './api/omdAPI';
import useFavorites from './api/favoritesAPI';

//TODO: add styles
const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  searchForm: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflowX: 'hidden',
    margin: 10,
    padding: 5,
    width: 'auto',
    height: 120,
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflowX: 'hidden',
    margin: 10,
    padding: 5,
    width: 'auto',
    height: 150,
},
  loginPaper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflowX: 'hidden',
    margin: 10,
    padding: 5,
    width: 'auto',
    height: 200,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflowX: 'hidden',
    margin: 10,
    padding: 5,
    minWidth: 150,
    height: 200,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: '100%',
    marginTop: 20,
  },
  text: {
    flex: '1 1 auto',
    color: 'black',
    fontSize: '1em',
    margin: 5,
  },
  titleText: {
    flex: '1 1 auto',
    color: 'black',
    fontSize: '2em',
    margin: 5,
  },
  importantText: {
    flex: '1 1 auto',
    color: 'red',
    fontSize: '1em',
    fontWeight: 600,
  },
  searchResultText: {
    flex: '1 1 auto',
    color: 'black',
    fontSize: '1.2em',
    fontWeight: 600,
    marginTop: 40,
  },
  searchButton: {
    marginRight: 10,
    width: 130,
    height: 40,
    backgroundColor: '#303030',
    color: 'white',
  },
  disabledButton: {
    marginRight: 10,
    width: 200,
    height: 40,
    color: 'white',
  },
  addButton: {
    marginRight: 10,
    width: 200,
    height: 40,
    backgroundColor: '#556b2f',
    color: 'white',
  },
  submitButton: {
    marginRight: 10,
    width: 200,
    height: 40,
    backgroundColor: 'grey',
    color: 'white',
  },
  removeButton: {
    marginRight: 10,
    width: 130,
    height: 40,
    backgroundColor: '#8B0000',
    color: 'white',
  },
};

function App() {
const [titleQuery, setTitleQuery] = useState('');
const [isUserValidated, setIsUserValidated] = useState(false);
//TODO: the user and password are set for default for UI testing only
const [login, setLogin] = useState('user');
const [password, setPassword] = useState('password');

const [{ data, isLoading, isLoadingError }, doFetch] = useOMDApi();
const [{favorites, actionRequired, isAddingError, isRemovingError}, setFavorite, setActionRequired] = useFavorites();

const displaySearchMoviesForm = () => {
  return(
 <div style={styles.searchForm}>
    <form onSubmit={event => {
      doFetch(`http://www.omdbapi.com/?apikey=68ac16ce&t=${titleQuery}`);
      event.preventDefault();
      }}>
      <input
        type="text"
        style={styles.text}
        value={titleQuery}
        placeholder="Enter the movie title here"
        onChange={event => setTitleQuery(event.target.value)}
      />
      <Button style={styles.searchButton} type="submit">Search</Button>
      </form>
      <div key={data.imdbID} style={styles.searchResultText}>
        {data.Title}
      </div>
      {isLoadingError && <div>Error loading your movie. Perhaps you are experience network interruptions. Please try again!</div>}
 </div>)};

    const displayUserLoginForm = () => {
      return(
      <Paper
      key={login} style={styles.loginPaper}
    >
      <div style={styles.text}>
     You have to be logged in to save the movies to Favorites:
      </div>
      <div style={styles.importantText}>
    The Login and Password fields cannot be empty
      </div>
      <form style={styles.loginForm} onSubmit={event => {
     login.length > 0 && password.length > 0 ? setIsUserValidated(true) : setIsUserValidated(false);
      event.preventDefault();
      }}>
      <input
        type="text"
        style={styles.text}
        value={login}
        onChange={event => setLogin(event.target.value)}
      />
      <input
        type="text"
        style={styles.text}
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
            <Button style={styles.submitButton} type="submit">Login</Button>
      </form>
      </Paper>)};

      
const displayFavorites = () => Object.values(favorites).map(favorite => {
  const { imdbID, Title, Genre, imdbRating, Year } = favorite;

        return (
          <Paper
            key={`paper${imdbID}`} style={styles.paper}
          >
              <div key={`title${imdbID}`} style={{fontSize: '1.2em', fontWeight: 600}}>
              Movie Title: {Title}
              </div>
              <div key={`genre${imdbID}`}>
              Genre: {Genre}
              </div>
              <div key={`imdbRating${imdbID}`}>
              IMDB Rating: {imdbRating}
              </div>
              <div key={`year${imdbID}`}>
              Year: {Year}
              </div>
           <div>
            <Button type="button" style={styles.removeButton} onClick={() => {setFavorite(favorite); setActionRequired('remove')}}>
               Remove
              </Button>
              {isRemovingError && <div>There was a problem removing your movie from Favorites!</div>}
              </div>
            
          </Paper>
        );
    });
  console.log('data.title', data.Title);
  return (
     <div style={styles.content}>
       <div key='app' style={styles.titleText}>
         Open Movie Database Search
       </div>
     {displaySearchMoviesForm()}
      <div>
      {!isUserValidated && (displayUserLoginForm())}
      </div>
      {isUserValidated && (
        <div>
      <div style={styles.content}>
        {(data.Title !== null && data.Title !== undefined) &&(
      <Button
      type="button"
      style={styles.addButton}
      onClick={() => {setFavorite(data); setActionRequired('add')}}
    >{`Add to favorites`}</Button>
        )}
         {isAddingError && <div>There was a problem adding your movie to Favorites!</div>}
        </div>
        <div key={favorites.length} style={styles.grid}>
        {favorites.length > 0 && displayFavorites()}
        </div>
        </div>
      )}
      </div>
  );
}
export default App;

