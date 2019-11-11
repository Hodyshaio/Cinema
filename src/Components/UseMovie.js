import { useState, useEffect } from 'react';
import axois from 'axios';

// Hooks
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=3f92a36e";

export const useMovie = () => {
    const [ movies, setMovies ] = useState([]);
    const [ erorrMessage, setMessege ] = useState(null);

    useEffect(() => {
        axois.get(MOVIE_API_URL)
        .then(data => data.json())
        .then(jsonResponse => {
            setMovies(jsonResponse);
        })
    })
} 