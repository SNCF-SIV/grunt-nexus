module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'test/*.js'
      ],
      options: {
        node: true,
        reporter: 'checkstyle',
        reporterOutput: 'jshint_checkstyle.xml'
      }
    },

    clean: {
      tests: ['src']
    },

    nexus: {
      options: {
        baseUrl:    'http://ic.yourcompany.com/nexus/content/repositories',
        repository: 'web',
        groupId:    'com.yourcompany.components.web',
        path:       'src/main/components'
      },
      runtime: {
        dependencies: {
          'a-fake-component': '1.0.0',
          'another-fake-component': '1.2.3'
        }
      },
      buildtime: {
        options: {
          path: 'src/test/components',
          extension: '.tgz'
        },
        dependencies: {
          'yet-another-fake-component': '0.1.2'
        }
      },
      anotherTarget: {
        options: {
          extension: 'tgz'
        },
        dependencies: {
          'nth-fake-component': '0.1.0'
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js'],
      options: {
        reporter: 'junit',
        reporterOptions: {
          output: 'test_reports'
        }
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('mockNexus', "Setup HTTP mocks", function() {
    require('nock')('http://ic.yourcompany.com')
    
    .get('/nexus/content/repositories/web/com/yourcompany/components/web/a-fake-component/1.0.0/a-fake-component-1.0.0.tar.gz')
    .replyWithFile(200, __dirname + '/test/fixtures/a-fake-component-1.0.0.tar.gz')
    
    .get('/nexus/content/repositories/web/com/yourcompany/components/web/another-fake-component/1.2.3/another-fake-component-1.2.3.tar.gz')
    .replyWithFile(200, __dirname + '/test/fixtures/another-fake-component-1.2.3.tar.gz')
    
    .get('/nexus/content/repositories/web/com/yourcompany/components/web/yet-another-fake-component/0.1.2/yet-another-fake-component-0.1.2.tgz')
    .replyWithFile(200, __dirname + '/test/fixtures/yet-another-fake-component-0.1.2.tgz')

    .get('/nexus/content/repositories/web/com/yourcompany/components/web/nth-fake-component/0.1.0/nth-fake-component-0.1.0.tgz')
    .replyWithFile(200, __dirname + '/test/fixtures/nth-fake-component-0.1.0.tgz');

    grunt.log.ok('Mocked URLs registered');
  });

  grunt.registerTask('test', ['clean', 'mockNexus', 'nexus', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);

};
