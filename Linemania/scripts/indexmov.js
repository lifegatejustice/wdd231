
// movies.js

// ----------------------------------
// 1) API Constants
// ----------------------------------
const API_KEY = 'd4959a464b2f03274d291417971935f8';
const BASE_URL = 'https://api.themoviedb.org/3';




// Fetch Popular (Featured) Movies
async function fetchFeaturedMovies(page = 1) {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured movies');
    }
    const data = await response.json();
    return data.results; // If you want fewer, use .slice(0, 10)
  } catch (error) {
    console.error('Error fetching featured movies:', error);
    return [];
  }
}

// Fetch Genres
async function fetchGenres() {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    const data = await response.json();
    return data.genres; // Returns an array of genre objects
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}

// Fetch Top Rated Movies
async function fetchTopRatedMovies(page = 1) {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch top-rated movies');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    return [];
  }
}

// ----------------------------------
// 3) CREATE CARD FUNCTIONS
// ----------------------------------

// Create a movie card
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  // Handle missing poster_path if needed
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  card.innerHTML = `
    <img src="${posterPath}" alt="${movie.title}" loading="lazy" />
    <h3>${movie.title}</h3>
    <p>Release Date: ${movie.release_date || 'N/A'}</p>
    <p>Rating: ${movie.vote_average || 'N/A'}</p>
  `;

  // Click event to show modal
  card.addEventListener('click', () => {
    showMovieDetails(movie);
  });

  return card;
}

// Create a genre card
function createGenreCard(genre) {
  const card = document.createElement('div');
  card.className = 'genre-card';
  card.textContent = genre.name;
  return card;
}

// ----------------------------------
// 4) MODAL FOR MOVIE DETAILS
// ----------------------------------
function showMovieDetails(movie) {
  const modal = document.createElement('div');
  modal.className = 'modal';

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${movie.title}</h2>
      <img src="${posterPath}" alt="${movie.title}" />
      <p>Release Date: ${movie.release_date || 'N/A'}</p>
      <p>Rating: ${movie.vote_average || 'N/A'}</p>
      <p>Overview: ${movie.overview || 'No overview available.'}</p>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal on click
  const closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

// ----------------------------------
// 5) DISPLAY FUNCTIONS
// ----------------------------------

// Display Featured Movies
async function displayFeaturedMovies() {
  const featuredList = document.getElementById('featured-list');
  featuredList.innerHTML = ''; // Clear previous content

  const movies = await fetchFeaturedMovies();
  movies.forEach(movie => {
    const card = createMovieCard(movie);
    featuredList.appendChild(card);
  });
}

// Display Genres
async function displayGenres() {
  const genresList = document.getElementById('genres-list');
  genresList.innerHTML = ''; // Clear previous content

  const genres = await fetchGenres();
  genres.forEach(genre => {
    const card = createGenreCard(genre);
    genresList.appendChild(card);
  });
}

// Display Top Rated Movies
async function displayTopRatedMovies() {
  const topRatedList = document.getElementById('top-rated-list');
  topRatedList.innerHTML = ''; // Clear previous content

  const movies = await fetchTopRatedMovies();
  movies.forEach(movie => {
    const card = createMovieCard(movie);
    topRatedList.appendChild(card);
  });
}

// ----------------------------------
// 6) INITIALIZE EVERYTHING
// ----------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  await displayFeaturedMovies();  // Popular (Featured)
  await displayGenres();          // Genres
  await displayTopRatedMovies();  // Top Rated
});

// Add this to your indexmov.js file

function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const prevButton = container.querySelector('.prev');
        const nextButton = container.querySelector('.next');
        
        let scrollAmount = 0;
        const scrollStep = 200; // Adjust this value to control scroll distance

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                scrollAmount = Math.max(scrollAmount - scrollStep, 0);
                carousel.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextButton.addEventListener('click', () => {
                const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
                carousel.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        // Optional: Hide navigation buttons if content fits without scrolling
        const observer = new ResizeObserver(() => {
            const shouldShowButtons = carousel.scrollWidth > carousel.clientWidth;
            prevButton.style.display = shouldShowButtons ? 'block' : 'none';
            nextButton.style.display = shouldShowButtons ? 'block' : 'none';
        });

        observer.observe(carousel);
    });
}

// Update your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', async () => {
    await displayFeaturedMovies();
    await displayGenres();
    await displayTopRatedMovies();
    initializeCarousels(); // Initialize carousels after content is loaded
});
