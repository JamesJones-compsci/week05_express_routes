const express = require('express');
const movieRoutes = express.Router();

// Route-level middleware
movieRoutes.use((req, res, next) => {
    console.log('Request made to /api/v1/movies');
    next();
});

movieRoutes.get('/', (req, res) => {
    res.send('<h1>List of Movies</h1>');
});

movieRoutes.post('/add', (req, res) => {
    res.send('<h1>Create a new movie</h1>');
});

movieRoutes.get('/error', (req, res) => {
    throw new Error('a contrived error from movie routes');
});

// Error-handling middleware specific to movieRoutes
movieRoutes.use((err, req, res, next) => {
    // console.error(err.stack);
    console.log('Error handling middleware called');
    res.status(500).send(`Something broke! Error: ${err.message}`);
});

module.exports = movieRoutes;