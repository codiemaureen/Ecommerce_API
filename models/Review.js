const mongoose = require('mongoose');
const Product = require('./Products')

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


reviewSchema.statics.calculateAverageRating = async function(productId) {
    const result = await this.aggregate([
        {$match: {product: productId}},
        {$group: {
            _id: null, 
            averageRating: {$avg: '$rating'},
            numOfReviews: { $sum: 1},
            },
        },
    ]);
    console.log(result);
    try {
        await this.model('Product').findOneAndUpdate(
            {_id:productId}, 
            {
                averageRating: Math.ceil(result[0]?.averageRating || 0),
                numOfReviews: result[0]?.numOfReviews || 0,
            },
        );
    } catch (error) {
        console.log(error);
    }
};

reviewSchema.post('save', async function(){
    await this.constructor.calculateAverageRating(this.product);
});
reviewSchema.post('remove', async function(){
    await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', reviewSchema);