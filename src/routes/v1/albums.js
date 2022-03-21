const express = require('express');
const router = express.Router();
const controller = require('../../controllers/albumControllers');
const auth = require('../../middleware/auth');

router.get('/album', controller.getAll);

router.get('/album/:albumId', controller.getById);

router.post('/album/:artistId', auth, controller.add);

router.put('/album/:id', controller.update);

router.delete('/album/:id', controller.delete);

module.exports = router;
