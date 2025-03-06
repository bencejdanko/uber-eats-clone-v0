require('dotenv').config();
const session = require('express-session');
const express = require('express');

const routers = require('./routes');

const cors = require('cors');

const app = express();

app.use(session({
    secret: 'data236-project',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: 'None' } // only true w/ https
}))

app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/customers', routers.customerRouter)
app.use('/api/restaurants', routers.restaurantRouter)

app.listen(5000, function () {
    console.log("Server listening on port 5000");
});
