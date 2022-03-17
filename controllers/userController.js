const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.send('Get All users');
};
exports.getSingleUser = async (req, res) => {
    const users = await User.find({});
    res.send('Get single user');
};
exports.showCurrentUser = async (req, res) => {
    const users = await User.find({});
    res.send('Show current user');
};
exports.updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({});
    res.send('Update user');
};
