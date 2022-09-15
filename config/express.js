const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routesConfig = require('../routes');
require('dotenv').config();

function configExpress() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  routesConfig(app);

  return app;
}

module.exports = configExpress;
