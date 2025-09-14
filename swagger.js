// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Contacts API',
    description: 'Auto-generated Swagger documentation for Contacts API',
    version: '1.0.0',
  },
  host: 'cse341-contacts-api-d974.onrender.com', // hard-pinned
  schemes: ['https'], // hard-pinned
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => { // <-- pass doc here
  console.log('Swagger JSON generated with host:', doc.host, 'schemes:', doc.schemes);
});
