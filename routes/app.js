var express = require('express');
var apiCall = require('../utilities/apiCalls');
var URI_TEST_PHP = require('../config/config').URI_TEST_PHP;
var http = require('http');

var app = express();

// Rutas
app.get('/', (req, res, next) => {
  console.log('Estoy dentro GET /');
  req.url = URI_TEST_PHP;
  apiCall.externalServiceCall(req, res, next);
});

module.exports = app;
