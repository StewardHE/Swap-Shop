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
const wishlist = require('./models/wishlist');

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

// route to get wish list
app.get('/wishlist', function(request, response) {
    // find in the wishlist table
    WishList.find({}).populate({path:'products', model: 'Product'}).exec(function (err, wishLists)
    { 
        if(err) {
            response.status(500).send({error:"Could not fetch wishLists"});
        } else{
            response.status(200).send({wishLists});
        }
    });
});

// route to post products to wish list
app.post('/wishlist', function(request, response) {
    var wishList = new WishList();
    wishList.title = request.body.title;
    
    // save
    wishList.save(function(err, newWishList) {
        if (err) {
            response.status(500).send({error:"could not created wishlist"})
        } else{
            response.send(newWishList);
        }
    });
});

// route to update wishlist
app.put('/wishlist/product/add', function(request, response) {
    Product.findOne({_id: request.body.productId}, function(err, product) {
        if (err) {
            response.status(500).send({error:"Could not add item to wishlist"});
        } else {
            WishList.update({_id:request.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList) {
                if (err) {
                    response.status(500).send({error:"Could not add item to wishlist"});
                } else {
                    response.send("Successfully added to wishlist");
                }
            });
        }
    })
 });

// server
app.listen(3000, function() {
    console.log('Swap Shop API running on port 3000');
})