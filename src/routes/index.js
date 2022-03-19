const express = require('express');
const routes = express.Router();
const indexRoute = require('./v1/index');
const albumRoutes = require('./v1/albums');
const artistRoutes = require('./v1/artist');

routes.use('/api/v1', [indexRoute, albumRoutes, artistRoutes]);

module.exports = routes;
