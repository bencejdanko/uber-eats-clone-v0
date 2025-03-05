require('dotenv').config();
const express = require('express');

const { customerRouter } = require('./routes');

const cors = require('cors');

const app = express();

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/customers', customerRouter)

app.listen(5000, function () {
    console.log("Server listening on port 5000");
});