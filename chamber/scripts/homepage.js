// Get the current year
const currentYear = new Date().getFullYear();

// Get the last modified date
const lastModifiedDate = document.lastModified;

// Select the footer paragraphs
const footerParagraphs = document.querySelectorAll('footer p');


// Update the first paragraph with the current year and add a line break
footerParagraphs[6].innerHTML = `© ${currentYear} 2025 Abia Chamber Of Commerce`;

// Update the third paragraph with the last modified date
footerParagraphs[7].textContent = `Last modified: ${lastModifiedDate}`;

document.getElementById('menu').addEventListener('click', toggleMenu);

function toggleMenu() {
    const nav = document.querySelector('.navigation');
    const menu = document.getElementById('menu');
    nav.classList.toggle('open');
    menu.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
    const weatherApiKey = 'cb9dc7fc689e41f4fe2dd4c5d716b04a'; // Replace with your OpenWeatherMap API key
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Abia&appid=${weatherApiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Abia&appid=${weatherApiKey}&units=metric`;
    
    // Fetch weather data
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const currentTemp = document.getElementById('current-temp');
            const weatherDescription = document.getElementById('weather-description');
            currentTemp.innerHTML = `<b>Current Temperature:</b> ${data.main.temp} °C`;
            weatherDescription.innerHTML = `<b>Weather: </b> ${data.weather[0].description}`;
        })
        .catch(error => console.error('Error fetching weather data:', error));

// Fetch forecast data
// Fetch forecast data
fetch(forecastApiUrl)
    .then(response => response.json())
    .then(data => {
        const forecastContainer = document.getElementById('forecast');
        const today = new Date(); // Get today's date

        // Process the next three days starting from today
        const uniqueDays = [];
        data.list.forEach(forecast => {
            const forecastDate = new Date(forecast.dt * 1000); // Convert timestamp to Date
            const day = forecastDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day name

            // Only add forecasts for unique days (up to 3)
            if (!uniqueDays.includes(day) && uniqueDays.length < 3) {
                uniqueDays.push(day);

                // Create and append the forecast element
                const forecastItem = document.createElement('div');
                forecastItem.innerHTML = `
                    <p><b>${day} (${forecastDate.toLocaleDateString('en-US')}) :</b> Temp: <b>${forecast.main.temp} °C</b></p>
                `;
                forecastContainer.appendChild(forecastItem);
            }
        });
    })
    .catch(error => console.error('Error fetching forecast data:', error));



    // Function to fetch members from the JSON file
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        return response.json();
    } catch (error) {
        console.error('Error loading members:', error);
        return [];
    }
}

// Function to create a member card
function createMemberCard(member) {
    return `
        <div class="member-card">
            <h3>${member.name}</h3>
            <p class="member-description">${member.description}</p>
            <div class="member-grid">
                <img src="${member.image}" alt="${member.name} logo" class="member-image">
                <div class="business-details">
                    <p><b>Address:</b> ${member.address}</p>
                    <p><b>Phone:</b> ${member.phone}</p>
                    <p><b>Website:</b> <a href="${member.website}" target="_blank">Visit Website</a></p>
                    <p><b>Membership Level:</b> ${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
                </div>
            </div>
        </div>
    `;
}

// Function to render spotlight members
async function renderSpotlightMembers() {
    const members = await fetchMembers();
    const spotlightContainer = document.getElementById('spotlight-container');
    
    // Filter and randomize members
    const filteredMembers = members.filter(member => member.membershipLevel === 1 || member.membershipLevel === 2);
    const randomMembers = filteredMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Render members in the container
    spotlightContainer.innerHTML = randomMembers.map(createMemberCard).join('');
}

// Initial render of spotlight members
renderSpotlightMembers();

});
