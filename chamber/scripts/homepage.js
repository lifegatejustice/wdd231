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
            currentTemp.textContent = `Current Temperature: ${data.main.temp} °C`;
            weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
        })
        .catch(error => console.error('Error fetching weather data:', error));

    // Fetch forecast data
    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecast');
            data.list.slice(0, 3).forEach(forecast => {
                const forecastItem = document.createElement('div');
                forecastItem.textContent = `Date: ${new Date(forecast.dt * 1000).toLocaleDateString()} - Temp: ${forecast.main.temp} °C`;
                forecastContainer.appendChild(forecastItem);
            });
        })
        .catch(error => console.error('Error fetching forecast data:', error));

    // Load spotlight members
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            const spotlightContainer = document.getElementById('spotlight-container');
            const filteredMembers = members.filter(member => member.membershipLevel === 1 || member.membershipLevel === 2);
            const randomMembers = filteredMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
            randomMembers.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('spotlight');
                memberCard.innerHTML = `
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <p>Phone: ${member.phone}</p>
                    <p>Address: ${member.address}</p>
                    <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                `;
                spotlightContainer.appendChild(memberCard);
            });
        })
        .catch(error => console.error('Error loading members:', error));
});
