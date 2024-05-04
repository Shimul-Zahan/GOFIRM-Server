const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subName: {
        type: String,
        required: true
    },
    details: String,
    image: {
        type: String
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
