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

  const displayProphets = (prophets) => {
    cards.innerHTML = ''; // Clear previous cards
    prophets.forEach((prophet, index) => {
      let card = document.createElement('section');
      let fullName = document.createElement('h2');
      let portrait = document.createElement('img');

      fullName.textContent = `${prophet.name} ${prophet.lastname}`;
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${index + 1} Latter-day Prophet`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');

      card.appendChild(fullName);
      card.appendChild(portrait);
      cards.appendChild(card);
    });
  }

  function filterByBirthplace(place) {
    const filteredProphets = allProphets.filter(prophet => {
      return place === 'Utah' ? prophet.birthplace === 'Utah' : prophet.birthplace !== 'Utah';
    });
    displayProphets(filteredProphets);
  }

  function filterByAge(minAge) {
    const filteredProphets = allProphets.filter(prophet => {
      const birthYear = new Date(prophet.birthdate).getFullYear();
      const deathYear = prophet.death ? new Date(prophet.death).getFullYear() : new Date().getFullYear();
      const age = deathYear - birthYear;
      return age >= minAge;
    });
    displayProphets(filteredProphets);
  }

  function filterByChildren(minChildren) {
    const filteredProphets = allProphets.filter(prophet => {
      return prophet.numChildren >= minChildren;
    });
    displayProphets(filteredProphets);
  }

  function filterByServiceYears(minYears) {
    const filteredProphets = allProphets.filter(prophet => {
      return prophet.yearsServed >= minYears;
    });
    displayProphets(filteredProphets);
  }

  // Attach filter functions to buttons
  document.querySelector('button[onclick="filterByBirthplace(\'Utah\')"]').addEventListener('click', () => filterByBirthplace('Utah'));
  document.querySelector('button[onclick="filterByBirthplace(\'Outside USA\')"]').addEventListener('click', () => filterByBirthplace('Outside USA'));
  document.querySelector('button[onclick="filterByAge(95)"]').addEventListener('click', () => filterByAge(95));
  document.querySelector('button[onclick="filterByChildren(10)"]').addEventListener('click', () => filterByChildren(10));
  document.querySelector('button[onclick="filterByServiceYears(15)"]').addEventListener('click', () => filterByServiceYears(15));
});
