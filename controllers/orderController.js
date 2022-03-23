const Product = require("../models/Products")
const Order = require("../models/Order")
const {StatusCodes} = require('http-status-codes');
const CustomError = require("../errors");
const {checkPermissions} = require('../utils');

const fakeStripeAPI = async( amount, currency) => {
    const client_secret = 'someRandomValue';
    return {client_secret, amount};
}

const createOrder = async(req, res)=> {
    const { items: cartItems, tax, shippingFee} = req.body;

    if(!cartItems || cartItems.length < 1){
        throw new CustomError.BadRequestError('Cart is empty');
    }

    if(!tax || !shippingFee){
        throw new CustomError.BadRequestError('Please provide Tax and shipping fee');
    }

    let orderItems = [];
    let subtotal = 0;

    for(const item of cartItems){
        const dbProduct = await Product.findOne({_id:item.product});
        if(!dbProduct){
            throw new CustomError.NotFoundError(`No product with id: ${items.product}`);
        }

        const {name, price, image, _id} = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name, 
            price,
            image, 
            product: _id
        };
        //add item to order
        orderItems = [...orderItems, singleOrderItem]
        //cal subtotal
        subtotal += item.amount * price;
    }
    const total = tax + shippingFee + subtotal;
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd'
    });

    const order = await Order.create({
        orderItems, 
        total, 
        subtotal, 
        tax, 
        shippingFee,
        clientSecret: paymentIntent.client_secret, 
        user:req.user.userId,
    })
    res.status(StatusCodes.CREATED).json({order, clientSecret: order.clientSecret});
};

const getAllOrders = async(req, res)=> {
    res.send('Get All Orders');
};

const getSingleOrder = async(req, res)=> {
    res.send('Get Single Order');
};

const getCurrentUseOrder = async(req, res)=> {
    res.send('Get Current User Order');
};

const updateOrder = async(req, res)=> {
    res.send('Update Order');
};

module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    getCurrentUseOrder
};