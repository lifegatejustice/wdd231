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

// Implement filtering and sorting functionality
function filterMovies(movies, minRating) {
    return movies.filter(movie => movie.vote_average >= minRating);
}

function sortMovies(movies, sortBy) {
    return [...movies].sort((a, b) => {
        if (sortBy === 'year') {
            return new Date(b.release_date) - new Date(a.release_date);
        } else if (sortBy === 'rating') {
            return b.vote_average - a.vote_average;
        } else {
            return a.title.localeCompare(b.title);
        }
    });
}

// Update the displayMovies function to include filtering and sorting
async function displayMovies(filterRating = 0, sortBy = 'title') {
    let movies = await fetchMovies();
    movies = filterMovies(movies, filterRating);
    movies = sortMovies(movies, sortBy);

    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        movieList.appendChild(card);
    });
}

// Add event listeners for filter and sort controls
document.addEventListener('DOMContentLoaded', () => {
    displayMovies();

    const filterSelect = document.getElementById('filter-select');
    const sortSelect = document.getElementById('sort-select');

    filterSelect.addEventListener('change', () => {
        const filterRating = Number(filterSelect.value);
        const sortBy = sortSelect.value;
        displayMovies(filterRating, sortBy);
    });

    sortSelect.addEventListener('change', () => {
        const filterRating = Number(filterSelect.value);
        const sortBy = sortSelect.value;
        displayMovies(filterRating, sortBy);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
});

// Implement search functionality
function searchMovies() {
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput.value.toLowerCase();

    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// dark and light mode functionality
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.innerText = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}
