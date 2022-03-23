const express = require('express');
const router = express.Router();

const {
    authenticateUser, authorizePermissions,
} = require('../middleware/authentication');


const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    getCurrentUseOrder
} = require('../controllers/orderController');


router
    .route('/')
    .post(authenticateUser, createOrder)
    .get(authenticateUser, authorizePermissions('admin'), getAllOrders);

router
    .route('/showAllMyOrders')
    .get(authenticateUser, getCurrentUseOrder)

router
    .route('/:id')
    .post(authenticateUser, getSingleOrder)
    .patch(authenticateUser, updateOrder)

module.exports = router;