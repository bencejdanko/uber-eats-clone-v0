require('dotenv').config();
const express = require('express');

const routers = require('./routes');

const cors = require('cors');

const app = express();

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/customers', routers.customerRouter)
app.use('/restaurants', routers.restaurantRouter)

app.listen(5000, function () {
    console.log("Server listening on port 5000");
});