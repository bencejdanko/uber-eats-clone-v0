require('dotenv').config();
const session = require('express-session');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for the API endpoints',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local server' }
        ]
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/customers', routers.customerRouter)
app.use('/api/restaurants', routers.restaurantRouter)
app.use('/api/cdn', routers.cdnRouter)

app.listen(5000, function () {
    console.log("Server listening on port 5000");
});
