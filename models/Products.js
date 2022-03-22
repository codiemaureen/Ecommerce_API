const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, 'Please provide product name'],
        maxlength: [100, 'Product Name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Please provide product price'],
        maxLength: [1000, 'Description cannot exceed 1000 characters']
    },
    image: {
        type: String,
        default: '/uploads/example.jpeg'
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ['office', 'kitchen', 'bedroom']
    },
    company: {
        type: String,
        required: [true, 'Please provide product company'],
        enum: {
            values: ['ikea', 'liddy', 'macros'],
            message: '{VALUE} is not supported'
        }
    },
    colors: {
        type: [String],
        required: [true, 'Please provide product color'],

    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping:{
        type: Number,
        default: false
    },
    inventory: {
        type: Number,
        required: true,
        default: 15
    },
    averageRating:{
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);