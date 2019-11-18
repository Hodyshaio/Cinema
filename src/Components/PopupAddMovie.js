import React from 'react'
import { connect } from 'react-redux';

const PopupAddMovie = props => {
    console.log("-------PopupAddMovie------");
    console.log("PopupAddMovie => props => ",props);

    // Save the data into global state after editing 
    function saveEdit(){
        console.log("saveEdit");
        console.log("props => ",props);
        let valTitle= document.getElementById("title").value;
        let valYear= document.getElementById("year").value
        for(let i = 0 ; i < props.movies.length; i++) {
            if(props.movies[i].imdbID === props.movie.imdbID) {
                console.log("props.movie.Title = val => ",props.movie.Title);
                props.movies[i].Title = valTitle;
                props.movies[i].Year = valYear;
                props.movie.Title = valTitle;
                props.movie.Year = valYear;
                
                props.saveMovie(props.movies);
                console.log("props.movie.Title = val => ",props.movies[i].Title);
                console.log("finish")
            } 
            if(props.movies[i].Title === valTitle && props.movies[i].imdbID !== props.movie.imdbID) {
                console.log("existing movie!!!!!!");
                break;
            }
            props.closeEditPopup(); 
        }
    }

    return (
        <div className="overlay">
        <div className="popup">
            <form className="ui form">
                <h4 className="ui dividing header">New Movie Details</h4>
                {/* <img className="right floated small ui image" src={props.movie.Poster} /> */}
                <div className="field">
                    <label>Title</label>
                    <div className="field">
                        <input type="text" id="title" defaultValue={props.movie.Title} name="movie[title]" pattern=""/>
                        {/* pattern="[A-Za-z]+('[A-Za-z]+)?"  */}
                    </div>
                    <label>Year</label>
                    <div className="field">
                        <input type="text" id="year" defaultValue={props.movie.Year} name="movie[year]" pattern="\b(19\d{2}|20\d[1-9])\b"/>
                    </div>
                </div> 
                <div style={{float:'right'}} className="ui buttons">
                    <input type="button" value='Cancle' onClick={() => props.closeAddMoviePopup()} className="ui button" />
                        <div className="or"></div>
                    <input type="button" value='Save' onClick={saveEdit.bind(this)} className="ui positive button"/>
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
        saveMovie: (movie) => dispatch({
            type:'SAVE_MOVIE',
            payload: movie 
        }),
        requestMovie: () => dispatch({
            type:'SEARCH_MOVIES_REQUEST' 
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupAddMovie);