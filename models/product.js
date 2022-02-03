// Requires
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Product schema
var product = new Schema({
    title: String, 
    price: Number,
    likes: {type: Number, default: 0}
});

// export the module and create the table in DB
module.exports = mongoose.model('Product', product);