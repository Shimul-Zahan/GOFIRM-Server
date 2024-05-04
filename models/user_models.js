// const { model, Schema } = require('mongoose');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
})


const User = mongoose.model('User', userSchema);
module.exports = User;