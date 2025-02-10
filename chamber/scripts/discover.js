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


document.addEventListener('DOMContentLoaded', function() {
    const attractionsData = [
        {
            "name": "National War Museum",
            "address": "Ebite Amafor, Isingwu Autonomous Community, Umuahia North LGA, Abia State.",
            "description": "Explore Nigeria's military history with exhibits from the pre-colonial era, the Nigerian Civil War, and traditional warfare. Notable artifacts include the Ojukwu Bunker.",
            "cost": "₦200 per person",
            "photoURL": "images/Aba-War-Museum.webp"
        },
        {
            "name": "Ariaria International Market",
            "address": "Aba, Abia State.",
            "description": "Dubbed the 'China of Africa,' this vast market is renowned for its affordable, locally made goods, especially shoes, bags, and clothing.",
            "cost": "Entry is free; shopping costs vary",
            "photoURL": "images/aba.webp"
        },
        {
            "name": "Azumini Blue River",
            "address": "Azumini Town, Ukwa East LGA, Abia State.",
            "description": "A picturesque river known for its clear blue waters, ideal for boat rides, fishing, and picnics.",
            "cost": "Varies depending on activities",
            "photoURL": "images/azumini-blue-river-138452.webp"
        },
        {
            "name": "Arochukwu Long Juju Slave Route",
            "address": "Arochukwu Town, Arochukwu LGA, Abia State.",
            "description": "A historic site featuring caves and shrines used during the slave trade era, offering insights into Nigeria's pre-colonial history.",
            "cost": "Varies; guided tours recommended",
            "photoURL": "images/aros-1024x683-1.webp"
        },
        {
            "name": "Abia State Yam Festival",
            "address": "Various communities across Abia State.",
            "description": "An annual cultural event celebrating the harvest of new yams with traditional dances, music, and feasting.",
            "cost": "Free to attend; dates vary by community",
            "photoURL": "images/abia_state_yam_festival.webp"
        },
        {
            "name": "Umudike Forest Reserve",
            "address": "Umudike, near Michael Okpara University, Umuahia, Abia State.",
            "description": "A tranquil forest reserve ideal for nature walks, bird watching, and studying diverse plant species.",
            "cost": "Free entry; guided tours may have fees",
            "photoURL": "images/forest.webp"
        },
        {
            "name": "Ojukwu Bunker",
            "address": "Umuahia, Abia State.",
            "description": "An underground bunker used by General Odumegwu Ojukwu during the Nigerian Civil War, now a historical site.",
            "cost": "Included in the National War Museum entry fee",
            "photoURL": "images/ojukwu_bunker.webp"
        },
        {
            "name": "Savor Local Cuisine",
            "address": "Local restaurants and eateries across Abia State.",
            "description": "Delight in traditional dishes like Ukazi soup, Abacha (African salad), Isi Ewu (goat head delicacy), and fresh Palm Wine.",
            "cost": "Prices vary by dish and location",
            "photoURL": "images/savor_local_cuisine.webp"
        }
    ];

    const container = document.getElementById('attractions-container');

    attractionsData.forEach(attraction => {
        // Create the card container
        const card = document.createElement('div');
        card.className = 'acard';

        // Create and append the title element directly to the card (outside of card-content)
        const title = document.createElement('h2');
        title.textContent = attraction.name;
        card.appendChild(title);

        // Create and append the Learn More button
        const learnMore = document.createElement('button');
        learnMore.className = 'learn-more';
        learnMore.textContent = 'Learn More';
        learnMore.onclick = function() {
            // Add your learn more functionality here
            console.log(`Learn more about ${attraction.name}`);
        };
        card.appendChild(learnMore);

        // Create and append the image element
        const img = document.createElement('img');
        img.src = attraction.photoURL;
        img.alt = attraction.name;
        img.onerror = function() {
            // Optionally, set a default image if there's an error loading the given image
            this.src = 'images/default.png';
        };
        card.appendChild(img);

        // Create the card-content container for additional details
        const content = document.createElement('div');
        content.className = 'card-content';

        // Create and append the address element
        const address = document.createElement('p');
        address.className = 'address';
        address.textContent = attraction.address;
        content.appendChild(address);

        // Create and append the description element
        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = attraction.description;
        content.appendChild(description);

        // Create and append the cost element
        const cost = document.createElement('p');
        cost.className = 'cost';
        cost.textContent = `Cost: ${attraction.cost}`;
        content.appendChild(cost);

        

        // Append the content container to the card
        card.appendChild(content);

        // Finally, append the complete card to the container element in your HTML
        container.appendChild(card);
    });
});
