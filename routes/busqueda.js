var express = require('express');
const URI_TEST_PHP = require('../config/config').URI_TEST_PHP;

var app = express();

// Rutas
app.get('/busqueda', (req, res, next) => {
  console.log('Estoy dentro GET /busqueda');
  res.status(200).json({
    ok: true,
    mensaje: 'Petición realizada correctamente',
  });
});

module.exports = app;
