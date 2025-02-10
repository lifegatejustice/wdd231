// Function to format date difference
function formatDateDiff(diff) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Back so soon! Awesome!";
    if (days === 1) return "You last visited 1 day ago.";
    return `You last visited ${days} days ago.`;
}

// Function to update visit info
function updateVisitInfo() {
    const visitInfoElement = document.getElementById('visit-info');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();

    if (!lastVisit) {
        visitInfoElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDiff = currentDate - parseInt(lastVisit);
        visitInfoElement.textContent = formatDateDiff(timeDiff);
    }

    localStorage.setItem('lastVisit', currentDate.toString());
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateVisitInfo);

import { places } from '../data/places.mjs';
console.log(places);

// Function to display places in the visit-info section
function displayPlaces() {
    const visitInfoElement = document.getElementById('visit-info');
    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.photoURL}" alt="${place.name}" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button>Learn More</button>
        `;
        visitInfoElement.appendChild(card);
    });
}

// Call the displayPlaces function to render the places
displayPlaces();
