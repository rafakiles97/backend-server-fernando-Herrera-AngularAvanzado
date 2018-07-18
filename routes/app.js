var express = require('express');

var app = express();

// Rutas
app.get('/', (req, res, next) => {
  console.log('Estoy dentro GET /');
  res.status(200).json({
    ok: true,
    mensaje: 'Petición realizada correctamente',
  });
});

module.exports = app;
