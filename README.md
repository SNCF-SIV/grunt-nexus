# grunt-nexus v2.0.x [![Build Status](https://travis-ci.org/SNCF-SIV/grunt-nexus.svg?branch=master)](https://travis-ci.org/SNCF-SIV/grunt-nexus)

> A plugin for downloading tarballed artifacts from Sonatype's Nexus repository.  
> Tested under Linux and Windows.

# Note
The v2.0.0 marks the public release.
This plugin has been used privately on a Sonatype Nexus 2.8.x.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-nexus --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nexus');
```

## The "nexus" task

### Overview
In your project's Gruntfile, add a section named `nexus` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  nexus: {
    options: {
      baseUrl:    'http://ic.yourcompany.com/nexus/content/repositories',
      repository: 'web',
      groupId:    'com.yourcompany.components.web',
      path:       'src/main/components'
    },
    runtime: {
      dependencies: {
        'angular': '1.2.23',
        'angular-route': '1.2.23',
        'lodash': '2.4.1'
      }
    },
    buildtime: {
      options: {
        path: 'src/test/components'
      },
      dependencies: {
        'angular-mocks': '1.2.23'
      }
    }
  }
})
```

### Configuration

#### dependencies
Type: `Hash`

The key identifies the artifact (i.e. artifactId), the value defines the requested version.

### Options
There are four mandatory options : baseUrl, repository, groupId and path.

#### baseUrl
Type: `String`

Nexus repositories' URL.

#### repository
Type: `String`

The name of the Nexus repository.

#### groupId
Type: `String`

The groupId that holds the artifact on Nexus.

#### path
Type: `String`

The directory where artifacts will be extracted to.

#### extension
Type: `String`
Default value: `.tar.gz`

Artifacts extension.

#### strictSSL (optional)
Type: `String`
Default value: `true`

If true, requires SSL certificates be valid. Used in case you use a `baseUrl` with HTTPS protocol and this certicate is not strictly secure (self-signed for instance)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Dependencies

[![Dependency Status](https://david-dm.org/SNCF-SIV/grunt-nexus.svg)](https://david-dm.org/SNCF-SIV/grunt-nexus)
[![devDependency Status](https://david-dm.org/SNCF-SIV/grunt-nexus/dev-status.svg)](https://david-dm.org/SNCF-SIV/grunt-nexus#info=devDependencies)

## Release History
 * 2016-01-12   v2.0.3   Fixing issue with `strictSSL`. 
 * 2016-01-11   v2.0.2   Added support for `strictSSL` option
 * 2014-11-24   v2.0.1   Improved the extension option to be more robust.
 * 2014-08-28   v2.0.0   First public release.
