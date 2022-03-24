const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController');
const auth = require('../../middleware/auth');

router.post('/review/:albumId', auth, reviewController.post);

module.exports = router;
