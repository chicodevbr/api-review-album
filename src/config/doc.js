const doc = {
  info: {
    version: '1.1.3',
    title: 'Album Review API',
    description: 'Welcome to Album Review API',
  },
  host: 'api-album-review.herokuapp.com',
  basePath: '/',
  schemes: ['https'],
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
      name: 'Users',
      description: 'Endpoints para cadastro e login de usuários.',
    },

    {
      name: 'Artists',
      description:
        'Endpoints que retornam infos de artistas cadastrados na base de dados.',
    },
    {
      name: 'Albums',
      description:
        'Endpoints com infos sobre os albums da nossa base de dados.',
    },
    {
      name: 'Reviews',
      description: 'Endpoints para postagem de reviews.',
    },
    {
      name: 'News',
      description: 'Endpoints de notícias sobre música.',
    },
    {
      name: 'Index',
      description: 'Endpoint de boas-vindas.',
    },
  ],
  definitions: {
    User: {
      id: 1,
      name: 'John Doe',
      email: 'email@email.com',
    },
  },
};
module.exports = doc;
