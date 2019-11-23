import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

const Popup = props => {
    console.log("----popup-----");

    const [ errorMessage, setErrorMessage ] = useState('');

    // Save the data into global state after editing 
    const saveEdit = () => {
        console.log("saveEdit");

        let valTitle = document.getElementById("title").value;
        let valYear = document.getElementById("year").value;

        // if no other movie is the same as the current movie
        const existingMovie = props.movies.filter(movie => movie.Title === valTitle && 
            movie.imdbID !== props.movie.imdbID)
            console.log("existingMovie => ", existingMovie);
        if (!existingMovie) {
            setErrorMessage('There is a movie of the same name, Please change the name of the movie!');
            return;
        }
        const movie = {
            ...props.movie,
            Title: valTitle,
            Year: valYear
        }
        props.saveMovie(movie);
        props.closeEditPopup();
    }

    const showError = errorMessage ? <div className="message message-danger">{errorMessage}</div> : null;

return (
    <div className="overlay">
        <div className="popup">
            <form className="ui form">
                <h4 className="ui dividing header">Movie Details</h4>
                <img className="right floated small ui image" src={props.movie.Poster} />
                <div className="field">
                    <label>Title</label>
                    <div className="field">
                        <input type="text" id="title" defaultValue={props.movie.Title} name="movie[title]" pattern="" />
                        {/* pattern="[A-Za-z]+('[A-Za-z]+)?"  */}
                        {/* {[A-Z]a-z} */}
                        { showError }
                    </div>
                    <label>Year</label>
                    <div className="field">
                        <input type="text" id="year" defaultValue={props.movie.Year} name="movie[year]" pattern="\b(19\d{2}|20\d[1-9])\b" />
                    </div>
                    {/* <label>Runtime</label>
                    <div className="field">
                        <input type="text" defaultValue={props.movie.Runtime} name="movie[runtime]" />
                    </div> */}
                    {/* <label>Genre</label>
                    <div className="field">
                        <select className="ui fluid dropdown">
                        <option value="">Select Genre</option>  
                        <option value="Ac">Action</option>
                        <option value="Ad">Adventure</option>
                        <option value="An">Animation</option>
                        <option value="Co">Comedy</option>
                        <option value="Cr">Crime</option>
                        <option value="Dr">Drama</option>
                        <option value="Fam">Family</option>
                        <option value="Fan">Fantasy</option>
                        <option value="Hi">Historitic</option>
                        <option value="Mu">Musical</option>
                        <option value="Sf">Science Fiction</option>
                        </select>
                    </div>
                    <label>Director</label>
                    <div className="field">
                        <input type="text" defaultValue={props.movie.Director} name="movie[director]" />
                    </div>  */}
                </div>
                <div style={{ float: 'right' }} className="ui buttons">
                    <input type="button" value='Cancle' onClick={() => props.closeEditPopup()} className="ui button" />
                    <div className="or"></div>
                    <input type="button" value='Save' onClick={saveEdit} className="ui positive button" />
                </div>
            </form>
        </div>
    </div>
)}

const mapStateToProps = state => {
    return {
        movie: state.reducer.selectedMovie,
        movies: state.reducer.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveMovie: (movie) => dispatch({
            type: 'SAVE_MOVIE',
            payload: movie
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
