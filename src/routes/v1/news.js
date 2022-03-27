const express = require('express');
const router = express.Router();
const newsController = require('../../controllers/newsController');
const auth = require('../../middleware/auth');

router.get('/news', newsController.getNews);
router.get('/news/:newsId', newsController.getNewsById);
router.post('/news', auth, newsController.post);
router.put('/news/newsId', auth, newsController.update);
router.patch('/news/newsId', auth, newsController.updateLikes);

module.exports = router;
