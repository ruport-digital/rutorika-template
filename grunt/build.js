'use strict';

module.exports = (grunt) => {

  grunt.registerTask('build-resources', [
    'compile',
    'clean:build',
    'copy:build',
    'imagemin:meta',
    'htmlmin',
    'prettify',
    'compress'
  ]);

  grunt.registerTask('build-finalize', [
    'string-replace:build',
    'cleanempty',
  ]);

  grunt.registerTask('build', [
    'build-resources',
    'build-finalize',
    'test'
  ]);

  grunt.registerTask('build-fast', [
    'build-resources',
    'build-finalize'
  ]);

  grunt.registerTask('build-critical', [
    'build-resources',
    'compile-critical',
    'build-finalize',
    'test'
  ]);

  grunt.registerTask('build-critical-fast', [
    'build-resources',
    'compile-critical',
    'build-finalize'
  ]);

};
