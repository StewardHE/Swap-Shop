// API Requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Database connection
var db = mongoose.connect('mongodb://localhost:27017/swag-shop');

// add the Models in the server
var Product = require('./models/product');
var WishList = require('./models/wishlist');
const { request } = require('https');

// app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
// route post to add new product 
app.post('/product', function(request, response) {
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.save(function(err, savedProduct) {
       if (err) {
           response.status(500).send({error:"Could not save product"});
       } else {
           response.send(savedProduct);
       }
    });
});

// route for show the products
app.get('/product', function(request, response) {
    // find all the products on DB
    Product.find({}, function(err, products) {
        // if error
        if (err) {
            res.status(500).send({error: "Could not fetch products"});
            // else, send the products
        } else{
            response.send(products);
        }
    });
});

// server
app.listen(3000, function() {
    console.log('Swap Shop API running on port 3000');
})