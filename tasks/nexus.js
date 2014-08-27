'use strict';
/* jshint unused:false */

var temp     = require('temp');
var download = require('./util/download');
var extract  = require('./util/extract');

module.exports = function(grunt) {

  grunt.registerMultiTask('nexus', 'A plugin for downloading tarballed artifacts from a Nexus repository', function() {
    var extension = ".tar.gz";

    // merge task-specific and/or target-specific options with these defaults
    var options = this.options();

    // merge options onto data, with data taking precedence
    var data = this.data;
    data = grunt.util._.merge(options, data);

    // preparing inputs
    data.groupId = data.groupId.replace(/\./g, '/'); // dots to slashes
    data.baseUrl = data.baseUrl.replace(/\/?$/, ''); // remove trailing slash
    data.path = data.path.replace(/\/?$/, '');       // remove trailing slash

    var done = this.async();
    var anErrorOccurred = false;

    grunt.util.async.forEach(Object.keys(data.dependencies), function(dependency, callback) {

      var artifact = {
        id: dependency,
        version: data.dependencies[dependency]
      };
      var file = artifact.id + '-' + artifact.version + extension;
      var url = data.baseUrl + '/' + data.repository + '/' + data.groupId + '/' + artifact.id + '/' + artifact.version + '/' + file;
      var dir = data.path + '/' + artifact.id;
      var tempPath = temp.path({prefix: 'grunt-nexus-', suffix: extension});

      download(url, tempPath)
      .then(function() {
        return extract(tempPath, dir);
      })
      .then(function() {
        grunt.log.ok('Successfully installed '+artifact.id+':'+artifact.version);
        callback();
      }, function(error) {
        grunt.log.error('Error when '+error.when+' '+artifact.id+':'+artifact.version+': '+error.message);
        anErrorOccurred = true;
        callback();
      });

    }, function(error) {
      done(!anErrorOccurred);
    });

  });

};
