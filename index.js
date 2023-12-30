'use strict';

const inputField = document.getElementById('text-field');
const searchForm = document.getElementById('movie');
const container = document.getElementById('container');


const moviesArr = [];


let watchlistArr = JSON.parse(localStorage.getItem('watchlist')) || [];


// replaces icon class
// adds films to watchlist array, removes duplicates and saves to local storage
document.addEventListener('click', (e) => {
    if(e.target.dataset.filmid) {
        const id = e.target.dataset.filmid;

        const elementActionIcon = document.querySelector(`[data-filmid='${id}']`);
        elementActionIcon.classList.replace('fa-circle-plus', 'fa-circle-check');

        for(const item of moviesArr) {
            if(item.imdbID === id) {
                watchlistArr.push(item);
            };
        };

        watchlistArr = watchlistArr.reduce((acc, current) => {
            const duplicates = acc.find(item =>  {
            return item.imdbID === current.imdbID;
        });
            if(!duplicates) {
                return acc.concat(current);
            }else {
                return acc;
            };
        }, []);
        
        setLocal();

    };
});


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    removeChildNodes(container);
    
    if(inputField.value === null || inputField.value === '') {
        removeChildNodes(container);
        container.innerHTML = `
        <div class="start-exploring">
            <p>Unable to find what you're looking for. Please try another search.<p>
        </div>    
        `

    } else {
        getFilmDetails();
    }
    
});

// fetches data from api and pushes to movie array calls renderFilm function
async function getFilmDetails() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=2ec4c37c&s=${inputField.value}&type=movie`);
    const data = await response.json();

    const filmId = getImdbID(data.Search);

    for(const item of filmId) {
        const response2 = await fetch(`http://www.omdbapi.com/?apikey=2ec4c37c&i=${item}`);
        const data2 = await response2.json();
        moviesArr.push(data2)
    };
    renderFilm(moviesArr, container);
};

// renders html to page
function renderFilm(films, container) {
    let htmlFeed = '';

    for(const film of films) {
        htmlFeed += `
        <div class="film-container">
            <div class="img-container">
                <img src="${film.Poster}" class="film-poster" alt="poster of film">
            </div>
            <div class="film-details">
                <div class="film-title-container">
                    <p class="film-title">${film.Title}</p>
                    <img class="rating-star" src="./images/star.png" alt="image of yellow star">
                    <p class="film-rating">${film.imdbRating}</p>
                </div>
                <div class="film-info">
                    <p class="film-typography">${film.Runtime}</p>
                    <p class="film-typography">${film.Genre}</p>
                    <i class="fa-solid fa-circle-plus" data-filmid="${film.imdbID}"></i>
                    <p class="watchlist-text film-typography">Watchlist</p>
                </div>      
                <p class="film-plot">${film.Plot}</p>
            </div>
        </div>
        `
    };
    container.innerHTML = htmlFeed;

};

// returns array of movie imdbIDs
function getImdbID(filmArr) {
        const movieId = filmArr.map((movie) => {
        return movie.imdbID;
    });
    return movieId;
};

// saves to local storage
function setLocal() {
    localStorage.setItem('watchlist', JSON.stringify(watchlistArr));
};

// checks for child nodes - removes if true
function removeChildNodes(parent) {
    if(parent.children.length > 0) {
        while(parent.firstChild) {
            parent.removeChild(parent.lastChild);
        };
    };
};