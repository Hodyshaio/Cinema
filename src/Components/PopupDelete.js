import React from 'react';
import { connect } from 'react-redux';

const PopupDelete = props => {
    
    console.log("----popup delete-----");
    console.log("PopupDelete => props => ",props);

    const deleteMovie = () => {
        console.log("deleteMovie");
        props.removeMovie(props.movies.filter(m => m.imdbID !== props.movie.imdbID));
        props.closeDeletePopup();
    }

    return(
        <div className="overlay">
            <div className="popup">
                <form className="ui form">
                <h4 className="ui dividing header">Delete Movie</h4>
                <div className="field">
                Are you sure you want to delete the movie: {props.movie.Title} ?
                </div>
                    <div className="ui buttons" style={{float:'right'}}>
                        <input type="button" value='Cancle' onClick={() => props.closeDeletePopup()} className="ui button" />
                            <div className="or"></div>
                        <input type="button" value='Delete' onClick={deleteMovie} className="ui positive button" />
                    </div>
                </form> 
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        movie: state.reducer.selectedMovie,
        movies: state.reducer.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeMovie: (movie) => dispatch({
            type: 'DELETE_MOVIE_FROM_MOVIES',
            payload: movie
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PopupDelete);