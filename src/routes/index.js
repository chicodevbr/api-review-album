const express = require('express');
const routes = express.Router();
const indexRoute = require('./v1/index');
const albumRoutes = require('./v1/albums');
const artistRoutes = require('./v1/artist');
const userRoutes = require('./v1/user');
const reviewRoutes = require('./v1/review');
const newsRoutes = require('./v1/news');

routes.get('/', (req, res) => {
  // #swagger.ignore = true
  res.redirect('/api/v1/docs');
});
routes.use('/api/v1', [
  indexRoute,
  userRoutes,
  albumRoutes,
  artistRoutes,
  reviewRoutes,
  newsRoutes,
]);

module.exports = routes;
