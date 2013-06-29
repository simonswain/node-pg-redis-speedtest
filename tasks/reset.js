module.exports = function(grunt) {
 
  grunt.registerTask('reset', 'Resets database to pristine state', function() {
    var done = this.async();
    var reset = require('../db/reset.js');
    reset(done);
  });

}
