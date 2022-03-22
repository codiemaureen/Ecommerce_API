const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview


} = require('../controllers/reviewController');
router
    .route('/')
    .get(authenticateUser, authorizePermissions('admin'), getAllReviews)
    .post(createReview)

router
    .route('/:id')
    .get(authenticateUser, authorizePermissions('admin'), getSingleReview)
    .patch(authenticateUser, authorizePermissions('admin'), updateReview)
    .delete(authenticateUser, authorizePermissions('admin'), deleteReview);

module.exports = router;