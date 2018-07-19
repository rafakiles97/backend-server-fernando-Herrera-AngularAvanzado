// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');
var loginRoutes = require('./routes/login');
var usuarioRoutes = require('./routes/usuario');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');

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

// Config Bodyparser - parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config Rutas
app.use('/', appRoutes);
app.use('/login', loginRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);

// Escuchar peticiones
app.listen(PORT, () => {
  console.log(
    'Express server lanzado en el puerto ' + PORT + ' \x1b[32m%s\x1b[0m', ' online'
  );
});
