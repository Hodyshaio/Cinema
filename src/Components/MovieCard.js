import React from 'react';
import Popup from './Popup';
import PopupDelete from './PopupDelete';
import { useState } from 'react';
import { connect } from 'react-redux';

const MovieCard = props => {

    const [ showEditPopup, setShowEditPopup ] = useState(false);
    const [ showDeletePopup, setShowDeletePopup ] = useState(false);

    function togglePopup(){
         console.log("togglePopup");
         showEditPopup ? setShowEditPopup(false) : setShowEditPopup(true);
         props.selectedMovieId(props.movie);
    }

    function deleteMovie(){
        console.log("deleteMovie");
        showDeletePopup ? setShowDeletePopup(false) : setShowDeletePopup(true);
        props.deletedMovie(props.movie);
    }

    const popupEdit = showEditPopup ? <Popup closeEditPopup={togglePopup.bind(this)} /> : null;
    const popupDelete = showDeletePopup ? <PopupDelete closeDeletePopup={deleteMovie.bind(this)} /> : null;

    return (
        <div> 
            <div style={{float: 'left', margin: '20px'}} className="ui card">
                <div className="content images">
                    { console.log("Component MovieCard") } 
                     <div className="header title">{props.movie.Title}</div>
                    { <img className="cover" src={props.movie.Poster}
                        alt={`The Movie Title: ${props.movie.Title}`}/>
                    } 
                    { <div>
                            <div className="ui two buttons">
                               <button onClick={togglePopup.bind(this)} 
                                  className="ui positive basic labeled icon button">Edit<i className="pencil alternate icon"></i></button>
                                <button onClick={deleteMovie.bind(this)}
                                 className="ui negative basic right labeled icon button">Delete<i className="trash icon"></i></button>
                            </div>
                      </div>
                    }
                </div>
            </div>
            <div style={{border:'2px',width:'400px'}}>{popupEdit}</div>
            <div style={{border:'2px',width:'400px'}}>{popupDelete}</div>
        </div>
    );
} 

const mapDispatchToProps = dispatch => {
    return {
        selectedMovieId: (movie) => dispatch({
            type:'MOVIE_SELECTED',
            payload: movie }),
        deletedMovie: (movie) => dispatch ({
            type: 'MOVIE_DELETED',
            payload: movie
        })
    }
}

export default connect(null, mapDispatchToProps)(MovieCard);