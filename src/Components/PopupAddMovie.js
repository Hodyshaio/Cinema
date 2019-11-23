import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

const PopupAddMovie = props => {
    console.log("-------PopupAddMovie------");
    console.log("PopupAddMovie => props => ",props);

    const [ errorMessage, setErrorMessage ] = useState('');

    // Add new movie to the global movies
    const addNewMovie = () => {
        console.log("addNewMovie");
        console.log("props => ",props);
       
        let ID = 'tt' + Math.random().toExponential().substr(2, 7);
        console.log("valID => ",ID);
        let valTitle = document.getElementById("title").value;
        let valYear = document.getElementById("year").value;
        let valPoster = document.getElementById("poster").value;

        const existingMovie = props.movies.filter(movie => movie.Title === valTitle && 
            movie.imdbID !== ID)
            console.log("existingMovie => ", existingMovie);

        if (!existingMovie) {
            setErrorMessage('There is a movie of the same name, Please change the name of the movie!');
            return;
        }

        const movie = {
            ...props.movie,
            Title: valTitle,
            Year: valYear,
            Poster: valPoster + '.jpg',
            imdbID: ID
        }
        
        const movies = [ ...props.movies ];
        movies.push(movie);
        console.log("movies => ",movies);
        
        props.addNewMovieToMovies(movies);
        props.closeAddMoviePopup(); 
    }

    const showError = errorMessage ? <div className="message message-danger">{errorMessage}</div> : null;

    return (
        <div className="overlay">
        <div className="popup">
            <form className="ui form">
                <h4 className="ui dividing header">New Movie Details</h4>
                <div className="field">
                    <label>Title</label>
                    <div className="field">
                        <input type="text" id="title" name="movie[title]" pattern=""/>
                        {/* pattern="[A-Za-z]+('[A-Za-z]+)?"  */}
                        { showError }
                    </div>
                    <label>Year</label>
                    <div className="field">
                        <input type="text" id="year" name="movie[year]" pattern="\b(19\d{2}|20\d[1-9])\b"/>
                    </div>
                    <label>Image</label>
                    <div className="field">
                        <input type="text" id="poster" name="movie[img]" pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"/>
                    </div>
                </div> 
                <div style={{float:'right'}} className="ui buttons">
                    <input type="button" value='Cancle' onClick={() => props.closeAddMoviePopup()} className="ui button" />
                        <div className="or"></div>
                    <input type="button" value='Add' onClick={addNewMovie} className="ui positive button"/>
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
        addNewMovieToMovies: (movie) => dispatch({
            type:'ADD_MOVIE',
            payload: movie 
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupAddMovie);