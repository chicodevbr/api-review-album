const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('API Album Review version 1.0.3');
  res.send('Hello API ALBUM REVIEW version 1.0.3');
});

module.exports = router;
