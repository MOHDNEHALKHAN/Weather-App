// server/weather.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const apiKey = process.env.API_KEY;
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

// Modify the route to fetch both current weather and forecast data
router.get('/:location', async (req, res) => {
    try {
        const {location} = req.params;
        // Prepare URLs for both current weather and forecast
        const currentWeatherUrl = `${apiUrl}?key=${apiKey}&q=${location}&aqi=yes`;
        const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=yes&alerts=no`; // Adjust 'days' as needed

        // Make both API calls concurrently
        const [currentResponse, forecastResponse] = await Promise.all([
            axios.get(currentWeatherUrl),
            axios.get(forecastUrl)
        ]);

        // Combine both responses into one object
        const combinedData = {
            current: currentResponse.data,
            forecast: forecastResponse.data
        };

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

module.exports = router;
