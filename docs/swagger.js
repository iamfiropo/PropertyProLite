const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'PropertyProLite API',
      version: '2.0.0',
      description: 'API docs for PropertyProLite Application'
    },
    securityDefinitions: {
      bearerAuth: {
        name: 'Authorization',
        in: 'header',
        type: 'apiKey',
      },
    },
    schemes: ['http'],
  },
  apis: ['./docs/*.yml'],
};

export default options;
