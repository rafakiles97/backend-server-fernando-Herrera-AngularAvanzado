var http = require('http');

exports.externalServiceCall = function (options, cb) {

  http.request(options, function (res) {
    var body = '';

    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      var price = JSON.parse(body);
      console.log(price);
    });

    res.on('error', cb);
  })
  .on('error', cb)
  .end();
};
