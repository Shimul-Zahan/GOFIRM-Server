const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    selectedCat: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    region: {
        type: String
    },
    quality: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    addedTime: {
        type: Date,
        required: true
    },
    orderNotes: {
        type: String
    },
    image: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product
