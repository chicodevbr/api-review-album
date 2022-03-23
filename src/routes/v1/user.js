const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/user/:userId', userController.update);
router.delete('/user/:userId', userController.delete);

module.exports = router;
