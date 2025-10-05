const express = require('express');
const fs = require('fs');
const path = require('path');

// Import existing route files
const movieRoutes = require('./routes/movies');
const studentRoutes = require('./routes/students');
const notesRoutes = require('./routes/notes');

const app = express();
const SERVER_PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application-level middleware (logging)
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
    next();
});

app.use((req, res, next) => {
    console.log("This always runs");
    next();
});

// Existing routes
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/notes', notesRoutes);

// ==========================================================
// Lab 5 - Section A: Practical Coding Tasks
// ==========================================================

// 1. Home Page Route
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// 2. Profile Route
app.get('/profile', (req, res, next) => {
    fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
        if (err) return next(err);
        res.json(JSON.parse(data));
    });
});

// 3. Login Route
app.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
        if (err) return next(err);

        const user = JSON.parse(data);

        if (username !== user.username) {
            return res.json({ status: false, message: "User Name is invalid" });
        }

        if (password !== user.password) {
            return res.json({ status: false, message: "Password is invalid" });
        }

        return res.json({ status: true, message: "User Is valid" });
    });
});

// 4. Logout Route
app.get('/logout/:username', (req, res) => {
    const { username } = req.params;
    res.send(`<b>${username} successfully logged out.</b>`);
});

// ==========================================================
// Extra root and error routes 
// ==========================================================
app.get('/', (req, res) => {
    res.send('<h1>Hello from Express</h1>');
});

app.get('/error', (req, res) => {
    throw new Error('A ROOT level contrived error');
});

// ==========================================================
// Error-handling middleware
// ==========================================================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Server Error");
});

// Start Server
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
