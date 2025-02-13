// Import the places array from your module file
import {places} from "data/places.mjs";
console.log(places);

// Function to build and display cards for each place
function displayItems(places) {
  const showHere = document.getElementById('showHere');
  
  places.forEach((x) => {
    // Build the card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Build the photo element
    const photo = document.createElement('img');
    photo.src = x.photoURL;  // Use photoURL since that's the property in your data
    photo.alt = x.name;
    card.appendChild(photo);
    // Build the title element
    const title = document.createElement('h2');
    title.innerText = x.name;
    card.appendChild(title);

    // Build the address element
    const address = document.createElement('p');
    address.innerText = x.address;
    card.appendChild(address);

    // Build the description element
    const description = document.createElement('p');
    description.innerText = x.description;
    card.appendChild(description);

    // Append the card to the container
    showHere.appendChild(card);
  });
}

// Start displaying all items from the imported data
displayItems(places);


