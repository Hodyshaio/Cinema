import React from 'react';
import Popup from './Popup';
import PopupDelete from './PopupDelete';
import { useReducer, useState } from 'react';
import { reducer, initialState } from '../Reducers';
import { connect } from 'react-redux';

const MovieCard = props => {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [ showEditPopup, setShowEditPopup ] = useState(false);
    const [ showDeletePopup, setShowDeletePopup ] = useState(false);

    function togglePopup(){
        console.log("togglePopup");
        showEditPopup ? setShowEditPopup(false) : setShowEditPopup(true);
        dispatch({
            type: "MOVIE_SELECTED",
            payload: props.movie
        });
        //console.log("dispatch");
    }

    function deleteMovie(){
        showDeletePopup ? setShowDeletePopup(false) : setShowDeletePopup(true);
        dispatch ({
            type: "MOVIE_SELECTED",
            payload: props.movie
        });
        console.log("showDeletePopup => ", showDeletePopup);
    }
    
    //const { selectedMovie } = state;
    //console.log("selectedMovie => ",selectedMovie);

    const popupEdit = showEditPopup ? <Popup /> : null;
    const popupDelete = showDeletePopup ? <PopupDelete /> : null;
    
    return (
        <div> 
            <div style={{float: 'left', margin: '20px'}} className="ui card">
                <div className="content images">
                    {/* { console.log("Component MovieCard"),
                    console.log("props.movie => ",props.movie.Title)} */}
                     <div className="header title">{props.movie.Title}</div>
                    { <img className="cover" src={props.movie.Poster}
                        alt={`The Movie Title: ${props.movie.Title}`}/>
                    } 
                    { <div>
                            <div className="ui two buttons">
                               <button onClick={ togglePopup.bind(this) }
                                  className="ui positive basic labeled icon button">Edit<i className="pencil alternate icon"></i></button>
                                <button onClick={ deleteMovie.bind(this) }
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

const mapStateToProp = state => {
    console.log("mapStateToProps");
    return {
        movie: state.selectedMovie
    };
}

export default connect(mapStateToProp)(MovieCard);
//export default MovieCard;