const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

function configExpress() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  return app;
}

module.exports = configExpress;
