const express = require('express');
const router = express.Router();
const controller = require('../../controllers/albumControllers');

router.get('/album', controller.getAll);
router.get('/album:id', controller.get);

router.post('/album', controller.add);

router.put('/album:id', controller.update);

router.delete('/album:id', controller.delete);

module.exports = router;
