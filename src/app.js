const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger_documentation.json');

app.use(express.json());
app.use(cors());

app.use(routes);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

module.exports = app;
