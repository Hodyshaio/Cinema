import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { validationTitle, updateTitle, validationYear,validationUrlPoster } from './Validation';

const PopupAddMovie = props => {

    const [ errorTitleMessage, setErrorTitleMessage ] = useState('');
    const [ errorYearMessage, setErrorYearMessage ] = useState('');
    const [ errorPosterMessage, setErrorPosterMessage ] = useState('');

    // Add new movie to the global movies
    const addNewMovie = () => {
       
        // Auto ID
        let ID = 'tt' + Math.random().toExponential().substr(2, 7);

        let valTitle = document.getElementById("title").value;
        let valYear = document.getElementById("year").value;
        let valPoster = document.getElementById("poster").value;

        const errorTitle = validationTitle(valTitle,props.movies,ID)
        const errorYear = validationYear(valYear);
        const errorPoster = validationUrlPoster(valPoster);

        if (errorTitle || errorYear || errorPoster) {
            setErrorTitleMessage(errorTitle);
            setErrorYearMessage(errorYear);
            setErrorPosterMessage(errorPoster);
            return;
        }
        else {
            const movie = {
            Title: updateTitle(valTitle),
            Year: valYear,
            Poster: valPoster,
            imdbID: ID
            }
            
            const movies = [ ...props.movies ];
            movies.push(movie);
            
            props.addNewMovieToMovies(movies);
            props.closeAddMoviePopup(); 
        }
    }

    return (
        <div className="overlay">
        <div className="popup">
            <form className="ui form">
                <h4 className="ui dividing header">New Movie Details</h4>
                <div className="field">
                    <label>Title</label>
                    <div className="field">
                        <input type="text" id="title" name="movie[title]" />
                        { errorTitleMessage ? <div className="message message-danger">{ errorTitleMessage }</div> : null }
                    </div>
                    <label>Year</label>
                    <div className="field">
                        <input type="text" id="year" name="movie[year]" />
                        { errorYearMessage ? <div className="message message-danger">{ errorYearMessage }</div> : null }
                    </div>
                    <label>Image</label>
                    <div className="field">
                        <input type="text" id="poster" name="movie[img]" />
                        { errorPosterMessage ? <div className="message message-danger">{ errorPosterMessage }</div> : null }
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