'use strict';

var grunt = require('grunt');

exports.nexus = {

  setUp: function(done) {
    done();
  },

  runtimeOptions: function(test) {
    test.expect(2);
    
    test.equal(
      grunt.file.read('src/main/components/a-fake-component/file'),
      grunt.file.read('test/expected/a-fake-component/file'),
      'The content of src/main/components/a-fake-component/file should match fixture'
    );

    test.equal(
      grunt.file.read('src/main/components/another-fake-component/file'),
      grunt.file.read('test/expected/another-fake-component/file'),
      'The content of src/main/components/another-fake-component/file should match fixture'
    );

    test.done();
  },

  buildtimeOptions: function(test) {
    test.expect(1);

    test.equal(
      grunt.file.read('src/test/components/yet-another-fake-component/file'),
      grunt.file.read('test/expected/yet-another-fake-component/file'),
      'The content of src/test/components/yet-another-fake-component/file should match fixture'
    );

    test.done();
  },

  anotherTargetOptions: function(test) {
    test.expect(1);

    test.equal(
      grunt.file.read('src/main/components/nth-fake-component/file'),
      grunt.file.read('test/expected/nth-fake-component/file'),
      'The content of src/main/components/nth-fake-component/file should match fixture'
    );

    test.done();
  }

};
