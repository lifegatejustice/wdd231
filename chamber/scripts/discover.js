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