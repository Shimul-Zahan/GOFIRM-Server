// models/Payment.js

const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
