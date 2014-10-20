var zlib = require('zlib');
var tar  = require('tar');
var fs   = require('fs');
var q    = require('q');

/**
 * Extracts a tar.gz
 */
module.exports = function(archive, dir) {
  var deferred = q.defer();

  fs.createReadStream(archive)
  .on('error', function(e) {
    deferred.reject({ when: 'reading archive', message: e.message });
  })
  .pipe(zlib.createGunzip())
  .on('error', function(e) {
    deferred.reject({ when: 'gunzipping', message: e.message });
  })
  .pipe(tar.Extract({ path: dir }))
  .on("error", function(e) {
    deferred.reject({ when: 'untaring', message: e.message });
  })
  .on("close", function() {
    deferred.resolve();
  });

  return deferred.promise;
};