const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateUser} = require('../middleware/authentication');  
const {authorizePermissions} = require('../middleware/authentication');  

router.route('/')
.get(authenticateUser, authorizePermissions('admin', 'owner'), userController.getAllUsers);


router.route('/showMe').get(authenticateUser, userController.showCurrentUser);
router.route('/updateUser').patch(authenticateUser, userController.updateUser);
router.route('/updateUserPassword').patch(authenticateUser, userController.upateUserPassword);


router.route('/:id').get(userController.getSingleUser);
router.route('/:id').get(authenticateUser, userController.getSingleUser);

module.exports = router;