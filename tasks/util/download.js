var request = require('request');
var fs      = require('fs');
var q       = require('q');

/**
 * Download a file from an uri
 */
module.exports = function(uri, file, strictSSL) {
  var deferred = q.defer();

  request({
    method: 'GET',
    uri: uri,
    proxy: false,
    strictSSL: strictSSL
  })
  .on('response', function (res) {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      deferred.reject({ when: 'downloading', message: 'Response status ' + res.statusCode });
    }
  })
  .on('error', function (error) {
    deferred.reject({ when: 'downloading', message: error.message });
  })
  .pipe(fs.createWriteStream(file))
  .on('error', function (error) {
    deferred.reject({ when: 'writing archive', message: error.message });
  })
  .on('close', function () {
    deferred.resolve();
  });

  return deferred.promise;
};
