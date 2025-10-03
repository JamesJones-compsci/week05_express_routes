const express = require('express');
const notesRoutes = express.Router();

// route() method chaining
notesRoutes.route('/note')
    .get((req, res, next) => {
        res.send('<h1>List of Notes</h1>');
    })
    .post((req, res, next) => {
        res.send('<h1>Create a new Note</h1>');
    })
    .put((req, res, next) => {
        res.send(`<h1>Update Note with ID ${req.params.id}</h1>`)
    })

    .delete((req, res, next) => {
        res.send(`<h1>Delete Note with ID ${req.params.id}</h1>`)
    });

    module.exports = notesRoutes;