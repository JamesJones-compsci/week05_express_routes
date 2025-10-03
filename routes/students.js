const express = require('express');
const studentRoutes = express.Router();

studentRoutes.get('/', (req, res) => {
    res.send('<h1>List of Students</h1>');
});

studentRoutes.post('/add', (req, res) => {
    res.send('<h1>Create a new student</h1>');
});

module.exports = studentRoutes;

