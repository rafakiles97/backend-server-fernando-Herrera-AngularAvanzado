var express = require('express');
var bcrypt = require('bcryptjs');
var mdAutenticacion = require('../middlewares/autenticacion');
var jwt = require('jsonwebtoken');

var app = express();

var Usuario = require('../models/usuario');

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  console.log('Estoy dentro GET /usuario');
  Usuario.find({}, 'nombre email img role').exec((err, usuarios) => {
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
  });
});

// Actualizar los datos de un usuario
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
  console.log('Estoy dentro PUT /');
  var id = req.params.id;
  var body = req.body;

  Usuario.findById(id, (err, usuario) => {
    if (err) {
      res.status(500).json({
        ok: false,
        mensaje: 'Error buscar usuario',
        errors: err,
      });
    } else if (!usuario) {
      res.status(400).json({
        ok: false,
        mensaje: 'El usuario con el id: ' + id + ' no existe.',
        errors: err,
      });
    } else {
      usuario.nombre = body.nombre;
      usuario.email = body.email;
      usuario.role = body.role;

      usuario.save((err, usuarioGuardado) => {
        usuarioGuardado.password = '#';
        if (err) {
          res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar usuario',
            errors: err,
          });
        } else {
          res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
          });
        };
      });
    };
  });
});

// Crear nuevo usuario
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
  console.log('Estoy dentro POST /');
  var body = req.body;
  var usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
    role: body.role,
  });
  usuario.save((err, usuarioGuardado) => {
    usuarioGuardado.password = '#';
    if (err) {
      res.status(400).json({
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

// Borrar un usuario
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
  console.log('Estoy dentro DELETE /');
  var id = req.params.id;
  var body = req.body;

  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if (err) {
      res.status(500).json({
        ok: false,
        mensaje: 'Error borrar usuario',
        errors: err,
      });
    } else if (!usuarioBorrado) {
      res.status(400).json({
        ok: false,
        mensaje: 'El usuario con el id: ' + id + ' no existe.',
        errors: err,
      });
    } else {
      res.status(200).json({
        ok: true,
        mensaje: 'Usuario borrado correctamente',
        usuarioBorrado: usuarioBorrado,
      });
    };
  });
});

module.exports = app;
