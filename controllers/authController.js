const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');


exports.register = async(req, res) => {
    const {email, name, password} = req.body;
    const emailAlreadyExist = await User.findOne({ email });
    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email already in use');
    };

    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const user = await User.create({name, email, password, role});
    const tokenUser = {name: user.name, userId: user._id, role: user.role}
    const token = jwt.sign(tokenUser, 'jwtSecret', {expiresIn: '1d'});
    res.status(StatusCodes.CREATED).json({ user: tokenUser, token});
};
exports.login = async(req, res) => {
    res.send('login')
};
exports.logout = async(req, res) => {
    res.send('logout')
};