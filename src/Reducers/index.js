import { combineReducers } from 'redux';

// Reducers

export const initialState = {
    loading: true,
    movies: [],
    selectedMovie: {}
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SEARCH_MOVIES_REQUEST":
        return {
          ...state,
          loading: true
        };
      case "SEARCH_MOVIES_SUCCESS":
          console.log("SEARCH_MOVIES_SUCCESS")
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
          //{
            return {
          ...state,
          loading: false,
          selectedMovie: action.payload,
        }
        //,
        // console.log("MOVIE_SELECTED =>>>>",initialState.selectedMovie)
        //   }
        
        
      default:
        return state;
    }
  };

const rootReducer = combineReducers({
    reducer
});

export default rootReducer;
