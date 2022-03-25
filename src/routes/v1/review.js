const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController');
const auth = require('../../middleware/auth');

router.get('/reviews', reviewController.getReviews);
router.get('/review/:reviewId', reviewController.getByReviewId);
router.get('/review/album/:albumId', reviewController.getByAlbumId);
router.post('/review/:albumId', auth, reviewController.post);

module.exports = router;
