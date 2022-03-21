const swaggerAutogen = require('swagger-autogen')();
const doc = require('./config/doc');

const outputFile = './src/swagger_documentation.json';
const endpointsFile = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFile, doc).then(() => {
  require('./app.js');
});
