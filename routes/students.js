const express = require('express');
const studentRoutes = express.Router();

// Route-level middleware
studentRoutes.use((req, res, next) => {
    console.log('Request made to /api/v1/students');
    next();
});

studentRoutes.get('/', (req, res) => {
    res.send('<h1>List of Students</h1>');
});

studentRoutes.post('/add', (req, res) => {
    res.send('<h1>Create a new student</h1>');
});

studentRoutes.get('/error', (req, res) => {
    throw new Error('A contrived error from students route')
});

// Error-handling middleware specific to studentRoutes
studentRoutes.use((err, req, res, next) => {
    // console.error(err.stack);
    console.log('Error handling middleware called');
    res.status(500).send(`Something broke! Error: ${err.message}`);
});

module.exports = studentRoutes;

