const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

exports.register = async(req, res) => {
    const {email} = req.body;
    const emailAlreadyExist = await User.findOne({ email });
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email already in use');
    }
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
};
exports.login = async(req, res) => {
    res.send('login')
};
exports.logout = async(req, res) => {
    res.send('logout')
};