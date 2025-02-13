// movies.js
const movieData = [
    { title: "The Shawshank Redemption", year: 1994, rating: 9.3, image: "shawshank.jpg" },
    { title: "The Godfather", year: 1972, rating: 9.2, image: "godfather.jpg" },
    { title: "The Dark Knight", year: 2008, rating: 9.0, image: "dark-knight.jpg" },
    { title: "12 Angry Men", year: 1957, rating: 8.9, image: "12-angry-men.jpg" },
    { title: "Schindler's List", year: 1993, rating: 8.9, image: "schindlers-list.jpg" },
    // Add more movies to meet the 15 item requirement
];

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="images/${movie.image}" alt="${movie.title}" loading="lazy">
        <h3>${movie.title}</h3>
        <p>Year: ${movie.year}</p>
        <p>Rating: ${movie.rating}</p>
    `;
    return card;
}

function displayMovies() {
    const movieList = document.getElementById('movie-list');
    movieData.forEach(movie => {
        const card = createMovieCard(movie);
        movieList.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', displayMovies);

// movies.js (continued)

function showMovieDetails(movie) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${movie.title}</h2>
            <img src="images/${movie.image}" alt="${movie.title}">
            <p>Year: ${movie.year}</p>
            <p>Rating: ${movie.rating}</p>
            <p>Description: ${movie.description}</p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="images/${movie.image}" alt="${movie.title}" loading="lazy">
        <h3>${movie.title}</h3>
        <p>Year: ${movie.year}</p>
        <p>Rating: ${movie.rating}</p>
    `;
    card.addEventListener('click', () => showMovieDetails(movie));
    return card;
}


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