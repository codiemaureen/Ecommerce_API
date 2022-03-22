const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(canditatePassword){
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', userSchema);