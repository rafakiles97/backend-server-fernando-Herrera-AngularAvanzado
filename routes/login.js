var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');

app.post('/', (req, res) => {

  console.log('Estas dentro POST /login ');
  var body = req.body;
  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar usuario',
        errors: err,
      });
    } else if (!usuarioDB) {
      res.status(400).json({
        ok: false,
        mensaje: 'Credenciales Incorrectas',
        errors: err,
      });
    } else {
      if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
        res.status(400).json({
          ok: false,
          mensaje: 'Credenciales Incorrectas',
          errors: err,
        });
      } else {
        usuarioDB.password = '#';
        var token = jwt.sign(
          { usuario: usuarioDB },
          SEED,
          { expiresIn: 14400 }
        );
        res.status(200).json({
          ok: true,
          mensaje: 'Usuario logueado correctamente',
          usuarioDB: usuarioDB,
          token: token,
        });
      }
    }
  });
});

module.exports = app;
