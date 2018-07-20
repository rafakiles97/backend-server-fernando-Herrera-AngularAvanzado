var express = require('express');
const URI_TEST_PHP = require('../config/config').URI_TEST_PHP;
var mdApiCall = require('../middlewares/apiCallS');

var app = express();

// Rutas
app.get('/', (request, response, next) => {
  console.log('Estoy dentro GET /');
  /*
  res.status(200).json({
    ok: true,
    mensaje: 'Petición realizada correctamente',
  });
  */
  var options = {
      host: URI_TEST_PHP,
      port: 80,
      path: '',
      method: 'GET',
    };

  mdApiCall.externalServiceCall(options, function (err, result) {
      if (err) {
        return console.log('Error while trying to get a price: ', err);
      }
    });
});

module.exports = app;
