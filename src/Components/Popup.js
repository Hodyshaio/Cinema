import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { validationTitle, validationYear, updateTitle } from './Validation';

const Popup = props => {
    
    let valTitle = React.createRef();
    let valYear = React.createRef();

    const [ errorTitleMessage, setErrorTitleMessage ] = useState('');
    const [ errorYearMessage, setErrorYearMessage ] = useState('');

    // Save the data into global state after editing and to put out error messages, if any
    const saveEdit = () => {
       
        const errorTitle = validationTitle(valTitle.current.value, props.movies, props.movie.imdbID);
        const errorYear = validationYear(valYear.current.value);  
        
        if (errorTitle || errorYear) {
            setErrorTitleMessage(errorTitle);
            setErrorYearMessage(errorYear);
            return;
        }
        else {
            const movie = {
                ...props.movie,
                Title: updateTitle(valTitle.current.value),
                Year: valYear.current.value
            }
            props.saveMovie(movie);
            props.closeEditPopup();
        }
    }

return (
    <div className="overlay">
        <div className="popup">
            <form className="ui form">
                <h4 className="ui dividing header">Movie Details</h4>
                <img src={props.movie.Poster} alt="poster of movie" className="right floated small ui image" />
                <div className="field">
                    <label>Title</label>
                    <div className="field">
                        <input type="text" ref={valTitle} defaultValue={props.movie.Title} name="movie[title]" />
                        { errorTitleMessage ? <div className="message message-danger">{ errorTitleMessage }</div> : null }
                    </div>
                    <label>Year</label>
                    <div className="field">
                        <input type="text" ref={valYear} defaultValue={props.movie.Year} name="movie[year]" />
                        { errorYearMessage ? <div className="message message-danger">{ errorYearMessage }</div> : null }
                    </div>
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
