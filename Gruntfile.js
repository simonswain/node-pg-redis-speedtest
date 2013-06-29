"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    nodeunit: {
      core: [
        'test/test.js'
      ]
    },
    jshint: {
      files: ['Gruntfile.js',
              'lib/**/*.js',
              'test/**/*.js'
             ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  //grunt.registerTask('test', ['jshint', 'nodeunit:core']);

  grunt.registerTask('default', ['jshint']);


};
