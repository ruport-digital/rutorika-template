'use strict';

module.exports = (grunt) => {

  grunt.registerTask('build-resources', [
    'compile',
    'clean:build',
    'copy',
    'imagemin:meta',
    'htmlmin',
    'prettify',
    'string-replace:indentation',
    'compress',
  ]);

  grunt.registerTask('build-finalize', [
    'string-replace:build',
    'cleanempty',
    'test',
  ]);

  grunt.registerTask('build', [
    'build-resources',
    'build-finalize'
  ]);

  grunt.registerTask('build-critical', [
    'build-resources',
    'compile-critical',
    'build-finalize'
  ]);

};
