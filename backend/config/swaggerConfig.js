const swaggerJsDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'Sample API',
            version: '1.0.0',
            description: 'A simple API for demonstration purposes',
        },
        servers: [
            {
                url: 'http://localhost:5000', // API server
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your route files
};

// Generate Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
