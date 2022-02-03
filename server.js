// API Requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Conect to database MongoDB
var db = mongoose.connect('mongodb://localhost:27017/swag-shop');


// app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// server
app.listen(3000, function() {
    console.log('Swap Shop API running on port 3000');
})