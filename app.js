// Requires
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');

// Inicializar las variables
var app = express();
const PORT = 3000;

// Conexión a la BD
mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB', (err, res) => {
  if (!err) {
    console.log(
      'Base de datos enlanzada en el puerto ' + PORT + ' \x1b[32m%s\x1b[0m', ' online'
    );
  } else {
    throw err;
  }
});

// Config Rutas
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);

// Config BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Escuchar peticiones
app.listen(PORT, () => {
  console.log(
    'Express server lanzado en el puerto ' + PORT + ' \x1b[32m%s\x1b[0m', ' online'
  );
});
