'use strict';
/* jshint camelcase: false */

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: 'checkstyle',
        reporterOutput: 'jshint_checkstyle.xml'
      }
    }

  });

  // Actually load this plugin's task(s)
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests
  grunt.registerTask('default', ['jshint']);

};
