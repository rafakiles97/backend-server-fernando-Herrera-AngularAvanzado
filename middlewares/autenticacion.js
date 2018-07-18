var jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

exports.verificaToken = function (req, res, next) {
  var token = req.query.token;
  jwt.verify(token, SEED, (err, decoded) => {
    if (err) {
      res.status(401).json({
        ok: false,
        mensaje: 'Token Incorrecto',
        errors: err,
      });
    } else {
      req.usuario = decoded.usuario;
      next();
    }
  });
};
