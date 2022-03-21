const User = require("../models/User")
const {StatusCodes} = require('http-status-codes');
const { CustomAPIError } = require("../errors");


exports.getAllUsers = async (req, res) => {
    console.log(req.user);
    const users = await User.find({role:'user'}).select('-password');
    res.status(StatusCodes.OK).json({users});
};
exports.getSingleUser = async (req, res) => {
    const user = await User.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new CustomAPIError.NotFoundError(`No user found with id ${req.params.id}`)
    };
        res.status(StatusCodes.OK).json({user});
};
exports.showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({user: req.user});

};
exports.updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({});
    res.send(req.body);
};
exports.upateUserPassword = async (req, res) => {
    const user = await User.find({});
    res.send('update password');
};