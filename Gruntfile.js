// Generated on 2014-03-28 using generator-phaser-official 0.0.8-rc-2
'use strict';
var config = require('./config.json');
var _ = require('underscore');
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

var HOST = '0.0.0.0';
var PORT = 8080;
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      scripts: {
        files: [
            'game/**/*.js',
            'assets/maps/**',
            'assets/assets.json',
            '!game/main.js',
            '*.md',
            '*.html',
            '*.js*',
        ],
        options: {
          spawn: false,
          livereload: LIVERELOAD_PORT
        },
        tasks: ['build']
      }
    },
    connect: {
      options: {
        port: PORT ,
        // change this to '0.0.0.0' to access the server from outside
         hostname: HOST 
        //hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://' + HOST + ':' + PORT
      }
    },
    copy: {
      dist: {
        files: [
          // includes files within path and its sub-directories
          { expand: true, src: ['assets/**'], dest: 'dist/' },
          { expand: true, flatten: true, src: ['game/plugins/*.js'], dest: 'dist/js/plugins/' },
          { expand: true, flatten: true, src: ['bower_components/**/build/*.js'], dest: 'dist/js/' },
          { expand: true, src: ['css/**'], dest: 'dist/' },
          { expand: true, src: ['index.html'], dest: 'dist/' }
        ]
      }
    },
    browserify: {
      build: {
        src: ['game/main.js'],
        dest: 'dist/js/game.js'
      }
    },
    exec: {
    build_docs: 'jsdoc -c conf.json --readme INDEX.md',
    kanso_push: 'kanso push',
    /*remove_logs: {
      command: 'rm -f *.log',
      stdout: false,
      stderr: false
    },
    list_files: {
      cmd: 'ls -l **'
    },
    list_all_files: 'ls -la',
    echo_grunt_version: {
      cmd: function() { return 'echo ' + this.version; }
    },
    echo_name: {
      cmd: function(firstName, lastName) {
        var formattedName = [
          lastName.toUpperCase(),
          firstName.toUpperCase()
        ].join(', ');

        return 'echo ' + formattedName;
      }
    }*/
  }
  });

  grunt.registerTask('build', ['buildBootstrapper', 'browserify', 'copy', 'exec:build_docs']);
  grunt.registerTask('publish', ['exec']);
  grunt.registerTask('serve', ['build', 'connect:livereload', 'watch']);
  grunt.registerTask('default', ['serve']);
  grunt.registerTask('prod', ['build', 'copy']);

  grunt.registerTask('buildBootstrapper', 'builds the bootstrapper file correctly', function() {
    var stateFiles = grunt.file.expand('game/states/*.js');
    var gameStates = [];
    var statePattern = new RegExp(/(\w+).js$/);
    stateFiles.forEach(function(file) {
      var state = file.match(statePattern)[1];
      if (!!state) {
        gameStates.push({shortName: state, stateName: _.capitalize(state) + 'State'});
      }
    });
    config.gameStates = gameStates;
    console.log(config);
    var bootstrapper = grunt.file.read('templates/_main.js.tpl');
    bootstrapper = grunt.template.process(bootstrapper,{data: config});
    grunt.file.write('game/main.js', bootstrapper);
  });
};
