var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Hospital = require('../models/hospital');

// Obtener todos los hospitales
app.get('/hospitales', (req, res) => {
  console.log('Estoy dentro GET /hospital');
  Hospital.find({}).exec((err, hospitales) => {
    if (!err) {
      res.status(200).json({
        ok: true,
        hospitales: hospitales,
      });
    } else {
      res.status(500).json({
        ok: false,
        mensaje: 'Error cargando hospitales',
        errors: err,
      });
    };
  });
});

// Actualizar los datos de un hospital
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
  console.log('Estoy dentro PUT /');
  var id = req.params.id;
  var body = req.body;

  Hospital.findById(id, (err, hospital) => {
    if (err) {
      res.status(500).json({
        ok: false,
        mensaje: 'Error buscar hospital',
        errors: err,
      });
    } else if (!hospital) {
      res.status(400).json({
        ok: false,
        mensaje: 'El hospital con el id: ' + id + ' no existe.',
        errors: err,
      });
    } else {
      hospital.nombre = body.nombre;
      hospital.usuario = req.usuario._id;

      hospital.save((err, hospitalGuardado) => {
        if (err) {
          res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar hospital',
            errors: err,
          });
        } else {
          res.status(201).json({
            ok: true,
            hospital: hospitalGuardado,
          });
        };
      });
    };
  });
});

// Crear nuevo hospital
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
  console.log('Estoy dentro POST /');
  var body = req.body;
  var hospital = new Hospital({
    nombre: body.nombre,
    usuario: req.usuario._id,
  });
  hospital.save((err, hospitalGuardado) => {
    if (err) {
      res.status(400).json({
        ok: false,
        mensaje: 'Error crear hospital',
        errors: err,
      });
    } else {
      res.status(201).json({
        ok: true,
        hospital: hospitalGuardado,
      });
    };
  });
});

// Borrar un hospital
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
  console.log('Estoy dentro DELETE /');
  var id = req.params.id;
  var body = req.body;

  Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
    if (err) {
      res.status(500).json({
        ok: false,
        mensaje: 'Error borrar hospital',
        errors: err,
      });
    } else if (!hospitalBorrado) {
      res.status(400).json({
        ok: false,
        mensaje: 'El hospital con el id: ' + id + ' no existe.',
        errors: err,
      });
    } else {
      res.status(200).json({
        ok: true,
        mensaje: 'Hospital borrado correctamente',
        hospitalBorrado: hospitalBorrado,
      });
    };
  });
});

module.exports = app;
