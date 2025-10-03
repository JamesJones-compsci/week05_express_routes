const express = require('express');
const movieRoutes = require('./routes/movies');
const studentRoutes = require('./routes/students');

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




// Add movie routes and student routes as middleware
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/students', studentRoutes);


app.get('/', (req, res) => {
    res.send('<h1>Hello from Express</h1>');
});

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});