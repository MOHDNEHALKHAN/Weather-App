// client/client.js
const searchBtn = document.querySelector('.src-icon')
searchBtn.addEventListener('click', async () => {
  const location = document.getElementById('inpBar').value;
  try {
      const response = await fetch(`/weather/${location}`);
      const weatherData = await response.json();
      // Call your function to update the DOM with weatherData
      updateWeatherInfo(weatherData);
  } catch (error) {
      console.error('Error fetching weather:', error);
  }
});

function updateWeatherInfo(data) {
  try {
    const current = data.current;
    const forecast = data.forecast;
    document.querySelector('.cityName').innerText = current.location.name;
    document.querySelector('.cityTemp').innerText = `${current.current.temp_c}°C`;
    document.querySelector('.cityCond').innerText = current.current.condition.text;
    document.querySelector('.date').innerText = new Date(current.current.last_updated).toLocaleDateString();
    document.querySelector('.aqi').innerText = `${current.current.air_quality.pm10} AQI`;
    document.querySelector('.humid').innerText = `${current.current.humidity}%`;
    document.getElementById('wind').innerText = `${current.current.wind_kph} km/h`;
    document.querySelector('.Rise').innerText = forecast.forecast.forecastday[0].astro.sunrise;
    document.querySelector('.Set').innerText = forecast.forecast.forecastday[0].astro.sunset;
    document.querySelector('.morn').innerText = `${forecast.forecast.forecastday[0].hour[7].temp_c}°C`;
    document.querySelector('.even').innerText = `${forecast.forecast.forecastday[0].hour[18].temp_c}°C`;
    document.querySelector('.night').innerText = `${forecast.forecast.forecastday[0].hour[23].temp_c}°C`;
  } catch (error) {
    console.error('Error updating weather info:', error);
    // Optionally, update the DOM to show an error message or clear outdated information
  }
}
