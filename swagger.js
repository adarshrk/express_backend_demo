/* 
    This module performs automatic construction of Swagger documentation. It can identify the endpoints and automatically 
    capture methods such as get, post, put, and so on. It also identifies paths, routes, middlewares, response status codes, 
    parameters in the path, header, query and body. It is possible to add information such as endpoint description, parameter 
    description, schemas, security, among others using comments in code. At the end, it generates the .json file containing the 
    Swagger format specification.
*/
const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const endpointsFiles = ['./index.js']

const doc = {
  info: {
    title: 'Inventory',
    description: 'Inventory CRUD operations'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';

swaggerAutogen(outputFile, endpointsFiles, doc);