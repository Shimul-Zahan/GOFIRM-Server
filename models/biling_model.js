// models/Billing.js

const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    companyName: String,
    country: String,
    streetAddress: String,
    townCity: String,
    stateCounty: String,
    postcodeZIP: String,
    phone: String,
    email: {
        type: String,
        required: true
    },
    orderNotes: String
});

const Billing = mongoose.model('Billing', billingSchema);
module.exports = Billing;
