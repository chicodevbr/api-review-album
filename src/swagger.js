const swaggerAutogen = require('swagger-autogen');
const doc = require('./config/swagger');

const outputFile = './src/swagger_documentation.json';
const endpoints = ['./app.js'];

swaggerAutogen(outputFile, endpoints, doc);
