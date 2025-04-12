const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Database API',
      version: '1.0.0',
      description: 'API documentation for the Movie Database project'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    // Apply the security globally to all endpoints (optional)
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJSDoc(options);