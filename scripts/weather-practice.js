document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
    const cards = document.querySelector('#cards');
    let allProphets = []; // Store all prophets data
  
    async function getProphetData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.table(data.prophets); // Log the fetched data for debugging
        allProphets = data.prophets; // Store the data for filtering
        displayProphets(allProphets); // Send the prophets array to displayProphets
      } catch (error) {
        console.error('Error fetching prophet data:', error);
      }
    }
  
    getProphetData();