const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {createJWT} = require('../utils');


exports.register = async(req, res) => {
    const {email, name, password} = req.body;
    const emailAlreadyExist = await User.findOne({ email });
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email already in use');
    };

    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const user = await User.create({name, email, password, role});
    const tokenUser = {name: user.name, userId: user._id, role: user.role};
    const token = createJWT({payload:tokenUser});

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly:true,
        expires: new Date(Date.now() + oneDay)
    })
    res.status(StatusCodes.CREATED).json({ user: tokenUser, token});
};
exports.login = async(req, res) => {
    res.send('login')
};
exports.logout = async(req, res) => {
    res.send('logout')
};