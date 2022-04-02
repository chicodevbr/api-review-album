const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  /*
  #swagger.tags = ['Index']
  #swagger.description = 'Endpoint index da API."
  */
  console.log('API Album Review version 1.1.1');
  res.status(200).send('Hello, Welcome to API ALBUM REVIEW.');
});

module.exports = router;
