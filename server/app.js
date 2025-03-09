require('dotenv').config();
const session = require('express-session');
const express = require('express');

const routers = require('./routes');

const app = express();

app.use(session({
    secret: 'data236-project',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'Lax' }
}))


app.use('/api/customers', express.json(), routers.customerRouter)
app.use('/api/restaurants', express.json(), routers.restaurantRouter)
app.use('/api/cdn', routers.cdnRouter)

app.listen(5000, function () {
    console.log("Server listening on port 5000");
});
