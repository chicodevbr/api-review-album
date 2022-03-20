module.exports = {
  info: {
    version: '1.1.3',
    title: 'Album Review API',
    description: "Album Review API' docs",
  },
  host: 'localhost:5000',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    JWT: {
      description: 'JWT token',
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
    definitions: {},
  },
};
