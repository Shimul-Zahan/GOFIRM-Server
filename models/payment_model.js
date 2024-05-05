const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    name: String,
    email: String,
    totalPrice: Number,
    products: [{ name: String, price: Number }],
    paymentStatus: String
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;