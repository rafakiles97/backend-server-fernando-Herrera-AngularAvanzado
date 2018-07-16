// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializar las variables
var app = express();
const PORT = 3000;

// Conexión a la BD
mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB', (err, res) => {
  if (!err) {
    console.log(
      'Base de datos enlanzada en el puerto ' + PORT + ' \x1b[32m%s\x1b[0m', ' online'
    );/*
    res.status(200).json({
      ok: true,
      mensaje: 'Conexión realizada correctamente',
    });*/
  } else {
    throw err;
  }
});

// Rutas
app.get('/', (req, res, next) => {
  res.status(200).json({
    ok: true,
    mensaje: 'Petición realizada correctamente',
  });
});

// Escuchar peticiones
app.listen(PORT, () => {
  console.log(
    'Express server lanzado en el puerto ' + PORT + ' \x1b[32m%s\x1b[0m', ' online'
  );
});
