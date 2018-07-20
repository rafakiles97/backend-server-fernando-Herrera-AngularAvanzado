var express = require('express');
var https = require('https');

const URI_TEST_PHP = require('../config/config').URI_TEST_PHP;

var app = express();

https.get(URI_TEST_PHP, function (res) {
      var body = '';

      res.on('data', function (chunk) {
        body += chunk;
      });

      res.on('end', function () {
        var fbResponse = JSON.parse(body);
        console.log('Got a response: ', fbResponse.picture);
      });
    }).on('error', function (e) {
      console.log('Got an error: ', e);
    }
  );

// Rutas
app.get('/', (req, res, next) => {
  console.log('Estoy dentro GET /');
  res.status(200).json({
    ok: true,
    mensaje: 'Petición realizada correctamente',
  });
});

module.exports = app;
