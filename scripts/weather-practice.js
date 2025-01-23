document.addEventListener('DOMContentLoaded', () => {
  const currentTemp = document.querySelector('#current-temp');
  const weatherIcon = document.querySelector('#weather-icon');
  const captionDesc = document.querySelector('figcaption');
  const myWeatherApi = 'cb9dc7fc689e41f4fe2dd4c5d716b04a'

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.749992&lon=6.637143&units=metric&appid=${weatherApi}`;

  async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data); // uncomment when ready
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.log(error);
    }
  }

  apiFetch();

  function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
  }
})

 