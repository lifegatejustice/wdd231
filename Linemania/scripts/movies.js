// movies.js
const API_KEY = 'd4959a464b2f03274d291417971935f8';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results.slice(0, 15); // Get the first 15 movies
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" loading="lazy">
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
        <p>Rating: ${movie.vote_average}</p>
        <p>Popularity: ${movie.popularity}</p>
    `;
    card.addEventListener('click', () => showMovieDetails(movie));
    return card;
}

function showMovieDetails(movie) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
            <p>Popularity: ${movie.popularity}</p>
            <p>Overview: ${movie.overview}</p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

async function displayMovies() {
    const movies = await fetchMovies();
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        movieList.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', displayMovies);

// movies.js (continued)

function filterMovies(minRating) {
    return movieData.filter(movie => movie.rating >= minRating);
}

function sortMovies(sortBy) {
    return [...movieData].sort((a, b) => {
        if (sortBy === 'year') {
            return b.year - a.year;
        } else if (sortBy === 'rating') {
            return b.rating - a.rating;
        } else {
            return a.title.localeCompare(b.title);
        }
    });
}

function displayMovies(movies = movieData) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        movieList.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayMovies();

    const filterSelect = document.createElement('select');
    filterSelect.innerHTML = `
        <option value="0">All Ratings</option>
        <option value="7">7+ Stars</option>
        <option value="8">8+ Stars</option>
        <option value="9">9+ Stars</option>
    `;
    filterSelect.addEventListener('change', (e) => {
        const filteredMovies = filterMovies(Number(e.target.value));
        displayMovies(filteredMovies);
    });

    const sortSelect = document.createElement('select');
    sortSelect.innerHTML = `
        <option value="title">Sort by Title</option>
        <option value="year">Sort by Year</option>
        <option value="rating">Sort by Rating</option>
    `;
    sortSelect.addEventListener('change', (e) => {
        const sortedMovies = sortMovies(e.target.value);
        displayMovies(sortedMovies);
    });

    const controlsDiv = document.createElement('div');
    controlsDiv.appendChild(filterSelect);
    controlsDiv.appendChild(sortSelect);
    document.querySelector('main').insertBefore(controlsDiv, document.getElementById('movie-list'));
});