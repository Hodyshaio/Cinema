import React from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import MovieCard from './Components/MovieCard';
import axois from 'axios';
import { useEffect, useReducer } from 'react';
import { reducer, initialState } from './Reducers';
import spinner from './assets/spinner.gif';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=3f92a36e';

const App = () => {

  const [ state, dispatch ] = useReducer(reducer,initialState);

  useEffect(() => {
    axois.get(MOVIE_API_URL)
    .then(data => { console.log("App: data => ",data.data)
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: data.data.Search
      });
    })
    .catch(error => {console.log("App: => opps! ",error.massege);})
  },[]);

  const onSubmit = (term) => {
       console.log("onSubmit => term=>",term)
       dispatch({
        type: "SEARCH_MOVIES_REQUEST",
      })
       axois.get(`http://www.omdbapi.com/?apikey=3f92a36e&s=${term}`)
       .then(data => {
         console.log("onSubmit => movie");
         console.log("onSubmit => data=>",data); 
         if(data.data.Response === 'True')
            dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: data.data.Search
            })
         else
            dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              payload: data.data.Search
            })})
        .catch(error => {
         console.log("onSubmit => opps! ",error.massege);
       })
  }

  const { loading, movies } = state;

  const showMovies = loading === true ? (
     <img className="spinner" src={spinner} alt="Loading spinner" />)
     : (movies.map((movie,index) => { return (<MovieCard key={index} movie={movie}/>)}))

   return(
         <div className="container ui" style={{marginTop:'20px'}}>
           <SearchBar send={onSubmit} />
             { showMovies }
         </div>
       );
}

export default App;
