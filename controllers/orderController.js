const createOrder = async(req, res)=> {
    res.send('Create Order');
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