const mongoose = require('mongoose');


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
        trim: true,
        required: [true, 'Please provide a email']
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