'use strict';

const btn = document.getElementById('search-btn');
const inputF = document.getElementById('text-field');
const form = document.getElementById('movie');

movie.addEventListener('submit', (e) => {
    e.preventDefault();
    test();
});

async function test() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=2ec4c37c&s=${inputF.value}`);
    const data = await response.json();
    console.log(data.Search);
}