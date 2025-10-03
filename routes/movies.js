const express = require('express');
const movieRoutes = express.Router();

movieRoutes.get('/', (req, res) => {
    res.send('<h1>List of Movies</h1>');
});

movieRoutes.post('/add', (req, res) => {
    res.send('<h1>Create a new movie</h1>');
});

module.exports = movieRoutes;