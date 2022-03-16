const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name'],
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please provide a email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide a password'],
        minLength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
});

module.exports = mongoose.model('User', userSchema);