'use strict';

const watchContainer = document.getElementById('watch-container');


let addedToWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

if(addedToWatchlist.length === 0) {
    renderEmptyWatchlist();
    
} else {
    renderFilm(addedToWatchlist, watchContainer);
};


const watchlistElements = document.querySelectorAll('.fa-circle-plus');
for(const item of watchlistElements) {
    item.classList.replace('fa-circle-plus', 'fa-circle-minus');
};


document.addEventListener('click', (e) => {
    if(e.target.dataset.filmid) {
        const id = e.target.dataset.filmid;

        const el = e.target.closest('.film-container');
        el.remove();
        
        addedToWatchlist = addedToWatchlist.filter((element) => {
            
            return element.imdbID !== id;
        });

        
    
    };

    if(addedToWatchlist.length === 0) {
        renderEmptyWatchlist();
        
    };
        
   localStorage.setItem('watchlist', JSON.stringify(addedToWatchlist))
});


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

function renderEmptyWatchlist() {
    watchContainer.innerHTML = `
        <div class="start-exploring">
               <p class="empty-watchlist-para">Your watchlist is looking a little empty...</p>
               <div class="watchlist-empty-container">
                    <div>
                        <a href="index.html">
                            <img src="./images/add-movies.svg">
                        </a>    
                    </div>
                    <p class="watchlist-small-para">Let's add some movies!</p> 
               </div>
            </div>
        `
};