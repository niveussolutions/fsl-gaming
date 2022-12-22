/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */


require('dotenv').config();
require('../FSL-Backend-Common/utils/tracing');


const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const swaggerTools = require('swagger-tools');
const cors = require('cors');
const YAML = require('yamljs');

// security issues
const helmet = require('helmet');

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self' 'unsafe-inline'"],
  },
}),
helmet.hsts({
  maxAge: 31536000,
  preload: true,
}));


const logger = require('../FSL-Backend-Common/utils/logger');
const { checkEnvVariables } = require('../FSL-Backend-Common/methods/checkEnvVariables');
const { processRequestParams } = require('../FSL-Backend-Common/methods/processRequest');

const swaggerConfig = YAML.load('./api/swagger.yaml');
app.use((err, req, res, next) => {
  // This check makes sure this is a JSON parsing issue, but it might be
  // coming from any middleware, not just body-parser:
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ status: 400 }); // Bad request
  }

  next();
});
app.use(cors(process.env.NODE_ENV !== 'development'
  ? { origin: `${process.env.APPLICATION_URL}` } : ''));
app.set('lastModified', false);


const serverPort = 5007;
app.use(express.json());

app.use(processRequestParams);


// swaggerRouter configuration
const options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './api/controllers'),
  useStubs: true, // Conditionally turn on stubs (mock mode)
};


// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerConfig, (middleware) => {
  // Interpret Swagger resources and attach
  // metadata to request - must be first in swagger-tools middleware chain
  app.use('/', middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use('/', middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use('/', middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  if (process.env.NODE_ENV !== 'production') {
    app.use('/resource-management/api', middleware.swaggerUi());
  }

  // Start the server
  http.createServer(app).listen(serverPort, () => {
    checkEnvVariables();
    logger.debug(`Your server is listening on port ${serverPort} (http://localhost:${serverPort})`);
    logger.debug(`Swagger-ui is available on http://localhost:${serverPort}/resource-management/api/docs`);
  });
});
module.exports = app;
