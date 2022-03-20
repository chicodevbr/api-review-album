const doc = {
  info: {
    version: '1.1.3',
    title: 'Album Review API',
    description: 'Welcome to Album Review API',
  },
  host: 'localhost:5000',
  basePath: '/',
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
  },
  tags: [
    {
      name: 'Albums',
      description:
        'Endpoints com infos sobre os albums da nossa base de dados.',
    },
  ],
};
module.exports = doc;
