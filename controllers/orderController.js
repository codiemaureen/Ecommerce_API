const Product = require("../models/Products")
const Order = require("../models/Order")
const {StatusCodes} = require('http-status-codes');
const CustomError = require("../errors");
const {checkPermissions} = require('../utils');

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
    console.log(orderItems);
    console.log(subtotal);
    res.send('create order');
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