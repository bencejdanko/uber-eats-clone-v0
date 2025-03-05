require('dotenv').config();
const express = require('express');

const { customerRouter } = require('./routes');

const cors = require('cors');

const app = express();

app.use(cors());

app.use('/customers', customerRouter)

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(5000, function () {
    console.log("Server listening on port 5000");
});