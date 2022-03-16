const express = require('express');
const routes = express.Router();
const indexRoute = require('./v1/index');
const albumRoutes = require('./v1/albums');

routes.use('/api/v1', [indexRoute, albumRoutes]);

module.exports = routes;
