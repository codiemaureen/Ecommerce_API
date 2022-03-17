const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authentication');  

router.route('/').get(authenticateUser, userController.getAllUsers);


router.route('/showMe').get(userController.showCurrentUser);
router.route('/updateUser').patch(userController.updateUser);
router.route('/updateUserPassword').patch(userController.upateUserPassword);


router.route('/:id').get(userController.getSingleUser);
router.route('/:id').get(authenticateUser, userController.getSingleUser);

module.exports = router;