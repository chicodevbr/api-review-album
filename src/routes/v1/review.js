const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController');
const auth = require('../../middleware/auth');

router.get('/review/:reviewId', reviewController.getByReviewId);
router.post('/review/:albumId', auth, reviewController.post);

module.exports = router;
