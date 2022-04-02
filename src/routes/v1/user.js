const express = require('express');
const { check, body } = require('express-validator');
const router = express.Router();
const userController = require('../../controllers/userController');

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    body('password').isLength({ min: 5 }),
  ],
  userController.signup
);
router.post(
  '/login',
  [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail()],
  userController.login
);
router.get('/users', userController.getAll);
router.put('/user/:userId', userController.update);
router.delete('/user/:userId', userController.delete);

module.exports = router;
