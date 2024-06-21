// client/client.js
const searchBtn = document.querySelector('.src-icon')
searchBtn.addEventListener('click', async () => {
  const location = document.getElementById('inpBar').value;
  try {
      const response = await fetch(`/weather/${location}`);
      const weatherData = await response.json();
      console.log(weatherData); // You can handle the DOM manipulation here
      // Call your function to update the DOM with weatherData
      updateWeatherInfo(weatherData);
  } catch (error) {
      console.error('Error fetching weather:', error);
  }
});

function updateWeatherInfo(data) {
  try {
    const current = data.current;
    document.querySelector('.cityName').innerText = current.location.name;
    document.querySelector('.cityTemp').innerText = `${current.current.temp_c}°C`;
    document.querySelector('.cityCond').innerText = current.current.condition.text;
    document.querySelector('.date').innerText = new Date(current.current.last_updated).toLocaleDateString();
    document.querySelector('.aqi').innerText = `${current.current.air_quality.pm10} AQI`;
  } catch (error) {
    console.error('Error updating weather info:', error);
    // Optionally, update the DOM to show an error message or clear outdated information
  }
}
