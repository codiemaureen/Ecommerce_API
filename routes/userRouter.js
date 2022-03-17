const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/').get(userController.getAllUsers);


router.route('/showMe').get(userController.showCurrentUser);
router.route('/updateUser').patch(userController.updateUser);
router.route('/updateUserPassword').patch(userController.upateUserPassword);


router.route('/:id').get(userController.getSingleUser);
router.route('/:id').get(userController.getSingleUser);

module.exports = router;