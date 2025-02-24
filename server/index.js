//import express module 
const express = require('express');
//create an express app
const  app = express();
//require express middleware body-parser
const bodyParser = require('body-parser');

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route to root
app.get('/', function (req, res) {
    res.render('home', {
        books: books
    });
});