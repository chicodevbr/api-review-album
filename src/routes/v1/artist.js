const express = require('express');
const router = express.Router();
const artistController = require('../../controllers/artistController');
const auth = require('../../middleware/auth');

router.get('/artist', artistController.getAll);
router.get('/artist/:artistId', artistController.getArtistById);
router.post('/artist', auth, artistController.add);
router.put('/artist/:artistId', auth, artistController.update);
router.delete('/artist/:artistId', auth, artistController.delete);

module.exports = router;
