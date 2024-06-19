// server/server.js
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, '../Assets')));

// API endpoint to fetch weather data
const weatherRouter = require('./weather');
app.use('/weather', weatherRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
