// server/weather.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const apiKey = process.env.API_KEY;
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

// Route to fetch weather data for a specific location
router.get('/:location', async (req, res) => {
    try {
        const { location } = req.params;
        const response = await axios.get(`${apiUrl}?key=${apiKey}&q=${location}&aqi=yes`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ error: 'Error fetching weather' });
    }
});

module.exports = router;
