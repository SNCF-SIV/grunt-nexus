# grunt-nexus v2.0.0

> A plugin for downloading tarballed artifacts from Sonatype's Nexus repository.  
> Tested under Linux and Windows.

# Note
The v2.0.0 marks the public release.
This plugin has been used privately on a Sonatype Nexus 2.8.x.
Unit tests are coming soon.

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
      baseUrl:    'http://yourcompany/nexus/content/repositories',
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


## Release History

 * 2014-08-28   v2.0.0   First public release.
