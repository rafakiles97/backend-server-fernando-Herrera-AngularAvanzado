var express = require('express');

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

var app = express();

// BUSQUEDA ESPECÍFICA
app.get('/coleccion/:tabla/:busqueda', (req, res, next) => {
  console.log('Estoy dentro GET /busqueda');

  var busqueda = req.params.busqueda;
  var tabla = req.params.tabla.toString();
  var regex = new RegExp(busqueda, 'i');

  var arrayPromesas = [];

  if (tabla == 'medicos') {
    buscarMedicos(busqueda, regex).then(medicos => {
      res.status(200).json({
        ok: true,
        mensaje: 'Médicos que contienen el siguiente string en el nombre: "'
                  + busqueda + '" encontrados',
        medicos: medicos,
      });
    });
  } else if (tabla == 'hospitales') {
    buscarHospitales(busqueda, regex).then(hospitales => {
      res.status(200).json({
        ok: true,
        mensaje: 'Hospitales que contienen el siguiente string en el nombre: "'
                  + busqueda + '" encontrados',
        hospitales: hospitales,
      });
    });
  } else if (tabla == 'usuarios') {
    buscarUsuarios(busqueda, regex).then(usuarios => {
      res.status(200).json({
        ok: true,
        mensaje: 'Usuarios que contienen el siguiente string en el nombre/email: "'
                  + busqueda + '" encontrados',
        usuarios: usuarios,
      });
    });
  } else {
    res.status(400).json({
      ok: false,
      mensaje: 'ERROR: La tabla en la que quieres buscar no existe',
    });
  }
});

// BUSQUEDA GENERAL
app.get('/todo/:busqueda', (req, res, next) => {
  console.log('Estoy dentro GET /busqueda');

  var busqueda = req.params.busqueda;
  var regex = new RegExp(busqueda, 'i');

  Promise.all([
    buscarHospitales(busqueda, regex),
    buscarMedicos(busqueda, regex),
    buscarUsuarios(busqueda, regex),
  ]).then(respuestas => {
    res.status(200).json({
      ok: true,
      mensaje: 'Datos que contienen el siguiente string: "'
                + busqueda + '" encontrados',
      hospitales: respuestas[0],
      medicos: respuestas[1],
      usuarios: respuestas[2],
    });
  });
});

//FUNCIONES
function buscarHospitales(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Hospital.find({ nombre: regex })
      .populate('usuario', 'nombre email')
      .exec((err, hospitales) => {
        if (err) {
          reject('Error al cargar hospitales', err);
        } else {
          resolve(hospitales);
        }
      });
  });
}

function buscarMedicos(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Medico.find({ nombre: regex })
      .populate('usuario', 'nombre email')
      .populate('hospital')
      .exec((err, medicos) => {
      if (err) {
        reject('Error al cargar medicos', err);
      } else {
        resolve(medicos);
      }
    });
  });
}

function buscarUsuarios(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Usuario.find({}, 'nombre email role').or([
      { nombre: regex },
      { email: regex },
    ]).exec((err, usuarios) => {
      if (err) {
        reject('Error al cargar usuarios', err);
      } else {
        resolve(usuarios);
      }
    });
  });
}

module.exports = app;
