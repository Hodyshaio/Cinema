import React from 'react';

export const validationTitle = (title, movies, id) => {
    if (!title) {
        return "Required!";
    }
    const movie = movies.filter(movie => movie.Title === title && movie.imdbID !== id);
    if (movie.length > 0) {
        return "There is a movie of the same name, Please change the name of the movie!"
    }
    if (title.length < 5){
        return "The name of the movie should be longer!";
    }
}

export const updateTitle = (term) => {
    const word = term.split('')
        .filter(x => /[A-Za-z/-/ /0-9]/.test(x))
        .join('')
        .toLowerCase()
        .split(' ')
        .map(x => {
            return x.charAt(0).toUpperCase() + x.substring(1)
        }).join(' ');
    return word;
}

export const validationYear = (year) => {
    if (!year) {
        return "Required!";
    }
    if (!/\b(19\d{2}|20\d[1-9])\b/.test(year))
        return "Please enter a year between 1990 - This year!";
}

export const validationUrlPoster = (urlPoster) => {
    if (!urlPoster) {
        return "Required!";
    }
    if (!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(urlPoster))
        return "Please enter a correct image address!";
}
