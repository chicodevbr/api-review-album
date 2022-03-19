const express = require('express');
const router = express.Router();
const artistController = require('../../controllers/artistController');

router.post('/artist', artistController.add);

module.exports = router;
