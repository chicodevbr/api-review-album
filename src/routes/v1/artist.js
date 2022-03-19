const express = require('express');
const router = express.Router();
const controller = require('../../controllers/artistController');

router.post('/artist', controller.add);

module.exports = router;
