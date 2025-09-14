// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Contacts API',
    description: 'Auto-generated Swagger documentation for Contacts API',
    version: '1.0.0'
  },
  host: 'localhost:3000',  // Render will override dynamically
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // Entry file that loads routes

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log('Swagger JSON generated.');
});
