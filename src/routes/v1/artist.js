const express = require('express');
const router = express.Router();
const artistController = require('../../controllers/artistController');
const auth = require('../../middleware/auth');

router.post('/artist', auth, artistController.add);

module.exports = router;
