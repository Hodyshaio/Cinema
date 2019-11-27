import React from 'react';
import axois from 'axios';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import PopupAddMovie from './PopupAddMovie';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import spinner from '../assets/spinner.gif';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=3f92a36e';

const Movies = props => {

  // For pagination
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ moviesPerPage ] = useState(6);

  // For PopupAddMovie
  const [ showAddPopup, setShowAddPopup ] = useState(false);

  // Initialization the site in movies
  useEffect(() => {
    props.searchMovieRequest();
    axois.get(MOVIE_API_URL)
    .then(data => { 
      props.searchMovieSuccess(data.data.Search);
    })
    .catch(error => {console.log("App: => opps! ",error.massege);})
  },[]);

  // Request single movie
  const onSubmit = (term) => {
       props.searchMovieRequest();
       axois.get(`http://www.omdbapi.com/?apikey=3f92a36e&s=${term}`)
       .then(data => {
         if(data.data.Response === 'True')
            props.searchMovieSuccess(data.data.Search);
         else
            props.searchMovieFailure(data.data.Search);})
       .catch(error => {
         console.log("onSubmit: => opps! ",error.massege);
        })
  }

  const showAddMovie = () => {
    showAddPopup ? setShowAddPopup(false) : setShowAddPopup(true);
  }

  // Get Current Movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = props.movies.slice(indexOfFirstMovie,indexOfLastMovie);

  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

   const showMovies = props.loading === true ? 
     (<img className="spinner" src={spinner} alt="Loading spinner" />)
     : (currentMovies.map((movie,index) => { return (<MovieCard key={index} movie={movie} />)}))

   const addPopup = showAddPopup ? <PopupAddMovie closeAddMoviePopup={showAddMovie} /> : null;

   return(
     <div>
         <div className="container ui" style={{marginTop:'20px'}}>
           <SearchBar send={onSubmit} />
           <div className="paging">
              <Pagination moviesPerPage={moviesPerPage} totalMovies={props.movies.length} paginate={paginate} />
           </div>
             { showMovies }
             <aside className="btnAside">
               <button onClick={showAddMovie.bind(this)} className="ui circular icon button teal btnAddMovie">
                 <span><i className="plus icon"></i></span>
               </button>
             </aside>
              { addPopup }
         </div>
      </div>
    );
}

// Injection of the global state into the component
const mapStateToProps = state => {
  return {
    loading: state.reducer.loading,
    movies: state.reducer.movies
  }
}

// Update the global state by functions
const mapDispatchToProps = dispatch => {
  return {
    searchMovieSuccess: (data) => dispatch({
        type:'SEARCH_MOVIES_SUCCESS',
        payload: data
    }),
    searchMovieRequest: () => dispatch({
        type: 'SEARCH_MOVIES_REQUEST'
    }),
    searchMovieFailure: (data) => dispatch({
        type: 'SEARCH_MOVIES_FAILURE',
        payload: data
    })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Movies);
