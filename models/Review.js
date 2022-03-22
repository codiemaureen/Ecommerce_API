const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please Provide Rating'],
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Please Provide Title'],
        maxlength: 100,
    },
    comment: {
        type: String,
        required: [true, 'Please Provide Comment'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required: true,
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref:'Product',
        required: true,
    },
},
    {timestamps: true}
);



//only one review per user
reviewSchema.index({product:1, user:1}, {unique: true});

module.exports = mongoose.model('Review', reviewSchema);