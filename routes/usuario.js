var express = require('express');

var app = express();

var Usuario = require('../models/usuario');

// Obtener todos los usuarios
app.get('/usuario', (req, res, next) => {
  Usuario.find({}, 'nombre email img role'.exec((err, usuarios) => {
    if (!err) {
      res.status(200).json({
        ok: true,
        usuarios: usuarios,
      });
    } else {
      res.status(500).json({
        ok: false,
        mensaje: 'Error cargando usuarios',
        errors: err,
      });
    };
  }));
});

// Crear nuevo usuario
app.post('/', (req, res) => {
  var body = req.body;
  var usuario = new Usuario({
    nombre: body.nombre,
    email: bodu.email,
    password: bodu.password,
    img: bodu.img,
    role: body.role,
  });

  usuario.save((err, usuarioGuardado) => {
    if (err) {
      res.status(500).json({
        ok: false,
        mensaje: 'Error crear usuario',
        errors: err,
      });
    } else {
      res.status(201).json({
        ok: true,
        usuario: usuarioGuardado,
      });
    };
  });
});

module.exports = app;
