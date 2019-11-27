import React from 'react';
import Popup from './Popup';
import PopupDelete from './PopupDelete';
import { useState } from 'react';
import { connect } from 'react-redux';

const MovieCard = props => {

    const [ showEditPopup, setShowEditPopup ] = useState(false);
    const [ showDeletePopup, setShowDeletePopup ] = useState(false);

    const togglePopup = () => {
        console.log("togglePopup");
        showEditPopup ? setShowEditPopup(false) : setShowEditPopup(true);
        props.selectedMovieId(props.movie);
    }

    const deleteMovie = () => {
        console.log("deleteMovie");
        showDeletePopup ? setShowDeletePopup(false) : setShowDeletePopup(true);
        props.deletedMovie(props.movie);
        //props.selectedMovieId(props.movie);
    }

    const popupEdit = showEditPopup ? <Popup closeEditPopup={togglePopup} /> : null;
    const popupDelete = showDeletePopup ? <PopupDelete closeDeletePopup={deleteMovie} /> : null;

    //function valid(props.name){
      //  console.log("valid----->");
        // /[A-Za-z/-/0-9]/
        //in console => 'HODaya@'.split().filter(x => /[A-Za-z/ /-/0-9]/.test(x)).join().toLowerCase().charAt(0).toUpperCase()
        const word = props.movie.Title.split('')
        .filter(x => /[A-Za-z/-/ /0-9]/.test(x))
        .join('')
        .toLowerCase()
        .split(' ')
      .map(x=>{
                return x.charAt(0).toUpperCase()+x.substring(1)
            }).join(' ');
            console.log(word);
        //console.log("word => ", str.split(' ').filter(x => /[A-Za-z/-/0-9]/.test(x))
        //join().toLowerCase());
        //.map(w => w.charAt[0].toUpperCase() + w.substring(1))
console.log(word);
        // return word;
    // }
    return (
        <div> 
            <div style={{float: 'left', margin: '25px'}} className="ui card col-md-4 col-sm-6 col-xs-12">
                <div className="content images">
                     <div className="header title">{word}</div>
                    { <img className="cover" src={props.movie.Poster}
                        alt={`The Movie Title: ${props.movie.Title}`}/> } 
                    { <div>
                            <div className="ui two buttons">
                               <button onClick={togglePopup} 
                                  className="ui positive basic labeled icon button">Edit<i className="pencil alternate icon"></i></button>
                                <button onClick={deleteMovie}
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