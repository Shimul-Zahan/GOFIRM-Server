const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
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
        type: String,
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
    },
    email: {
        type: String
    },
    oldId: {
        type: String
    }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart
