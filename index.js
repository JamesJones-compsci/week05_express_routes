const express = require('express');
const movieRoutes = require('./routes/movies');
const studentRoutes = require('./routes/students');
const notesRoutes = require('./routes/notes');


const app = express();
const SERVER_PORT = process.env.PORT || 3000;

// Build-in middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application-level middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
    next();
});

app.use((req, res, next) => {
    console.log("This always runs");
    next();
})


// Add movie routes, student routes, and notes routes as middleware
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/notes', notesRoutes);



app.get('/', (req, res) => {
    res.send('<h1>Hello from Express</h1>');
});

// http://localhost:300/error
app.get('/error', (req, res) => {
    throw new Error('A ROOT level contrived error');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    // console.error(err.stack);
    console.log('Error handling middleware called');
    res.status(500).send(`ROOT | Something broke! Error: ${err.message}`);
});

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});