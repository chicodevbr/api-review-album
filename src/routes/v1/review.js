const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController');
const auth = require('../../middleware/auth');

router.get('/reviews', reviewController.getReviews);
router.get('/review/:reviewId', reviewController.getByReviewId);
router.get('/review/album/:albumId', reviewController.getByAlbumId);
router.get('/review/user/:userId', reviewController.getByUserId);
router.post('/review/:albumId', auth, reviewController.post);
router.patch('/review/:reviewId', auth, reviewController.updateLikes);
router.put('/review/:reviewId', auth, reviewController.update);
router.delete('/review/:reviewId', auth, reviewController.delete);

module.exports = router;
