const express = require('express');
const router = express.Router();
const newsController = require('../../controllers/newsController');
const auth = require('../../middleware/auth');

router.post('/news', auth, newsController.post);

module.exports = router;
