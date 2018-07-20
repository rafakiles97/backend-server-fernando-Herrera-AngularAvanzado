var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Medico = require('../models/medico');

// Obtener todos los medicos
app.get('/medicos', (req, res) => {
  console.log('Estoy dentro GET /medicos');
  Medico.find({}).populate('usuario', 'nombre email').exec((err, medicos) => {
    if (!err) {
      res.status(200).json({
        ok: true,
        medicos: medicos,
      });
    } else {
      res.status(500).json({
        ok: false,
        mensaje: 'Error cargando medicos',
        errors: err,
      });
    };
  });
});

// Actualizar los datos de un medico
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
  console.log('Estoy dentro PUT /');
  var id = req.params.id;
  var body = req.body;

  Medico.findById(id, (err, medico) => {
    if (err) {
      res.status(500).json({
        ok: false,
        mensaje: 'Error buscar medico',
        errors: err,
      });
    } else if (!medico) {
      res.status(400).json({
        ok: false,
        mensaje: 'El medico con el id: ' + id + ' no existe.',
        errors: err,
      });
    } else {
      medico.nombre = body.nombre;
      medico.hospital = body.hospital;
      medico.usuario = req.usuario._id;

      medico.save((err, medicoGuardado) => {
        if (err) {
          res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar medico',
            errors: err,
          });
        } else {
          res.status(201).json({
            ok: true,
            medico: medicoGuardado,
          });
        };
      });
    };
  });
});

// Crear nuevo medico
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
  console.log('Estoy dentro POST /');
  var body = req.body;
  var medico = new Medico({
    nombre: body.nombre,
    hospital: body.hospital,
    usuario: req.usuario._id,
  });
  medico.save((err, medicoGuardado) => {
    if (err) {
      res.status(400).json({
        ok: false,
        mensaje: 'Error crear medico',
        errors: err,
      });
    } else {
      res.status(201).json({
        ok: true,
        medico: medicoGuardado,
      });
    };
  });
});

// Borrar un medico
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
  console.log('Estoy dentro DELETE /');
  var id = req.params.id;
  var body = req.body;

  Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
    if (err) {
      res.status(500).json({
        ok: false,
        mensaje: 'Error borrar medico',
        errors: err,
      });
    } else if (!medicoBorrado) {
      res.status(400).json({
        ok: false,
        mensaje: 'El medico con el id: ' + id + ' no existe.',
        errors: err,
      });
    } else {
      res.status(200).json({
        ok: true,
        mensaje: 'Medico borrado correctamente',
        medicoBorrado: medicoBorrado,
      });
    };
  });
});

module.exports = app;
