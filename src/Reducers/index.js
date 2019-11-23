import { combineReducers } from 'redux';

// Reducers

export const initialState = {
    loading: true,
    movies: [],
    selectedMovie: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SEARCH_MOVIES_REQUEST":
        return {
          ...state,
          loading: true
        };
      case "SEARCH_MOVIES_SUCCESS":
        return {
          ...state,
          loading: false,
          movies: action.payload
        };
      case "SEARCH_MOVIES_FAILURE":
        return {
          ...state,
          loading: false
        };
      case "MOVIE_SELECTED":
        return {
          ...state,
          loading: false,
          selectedMovie: action.payload
      };
      case "MOVIE_DELETED":
        return {
          ...state,
          loading: false,
          selectedMovie: action.payload
      };
      case "DELETE_MOVIE_FROM_MOVIES":
        return {
            ...state,
            loading: false,
            movies: action.payload
      };
      case "SAVE_MOVIE":
        const movies = [ ...state.movies ]
        for(let i = 0; i < movies.length; i++ ){//את מי לשנות 
          if(movies[i].imdbID === state.selectedMovie.imdbID)
            movies[i] = action.payload;
        }
        return {
          ...state,
          loading: false,
          movies: movies
        };
      case "ADD_MOVIE":
        // const movies = [ ...state.movies ];
        // movies.push(action.payload);
        // for(let i = 0; i < movies.length; i++ ){ 
        //   if(movies[i].imdbID === state.selectedMovie.imdbID)
        //     movies[i] = action.payload;
        // }
        return {
          ...state,
          loading: false,
          movies: action.payload
          //movies: movies
        };
      default:
        return state;
    }
  };

const rootReducer = combineReducers({
    reducer
});

export default rootReducer;
