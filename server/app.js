require('dotenv').config();
const express = require('express');

const cors = require('cors');

// const router = require('./books.routes.js');

const app = express();

app.use(cors());

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Use the router
// app.use('/api', router);

app.listen(5000, function () {
    console.log("Server listening on port 5000");
});