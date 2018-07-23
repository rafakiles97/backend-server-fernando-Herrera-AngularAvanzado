var http = require('http');

exports.externalServiceCall = function (req, res, next) {

  http.get(req.url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      data = JSON.parse(data);
      res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente',
        data: data,
      });
      next();
    });

  }).on('error', (err) => {
    console.log('Error: ' + err.message);
    res.status(504).json({
      ok: false,
      mensaje: 'Error al ejecutar la llamada a ' + req.url,
      errors: err,
    });
  });
};
