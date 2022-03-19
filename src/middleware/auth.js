const jwt = require('jsonwebtoken');
const environment = require('../config/environment');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Not authorized...');

  try {
    const secretKey = environment.jwtAccessTokenSecret;
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
}

module.exports = auth;
