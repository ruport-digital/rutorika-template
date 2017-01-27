'use strict';

module.exports = (grunt) => {

  grunt.registerTask('build', [
    'compile',
    'test',
    'clean:build',
    'copy:build',
    'copy:meta',
    'imagemin',
    'htmlmin',
    'prettify',
    'compress',
    'string-replace:build',
    'cleanempty'
  ]);

  grunt.registerTask('build-fast', [
    'compile',
    'clean:build',
    'copy:build',
    'copy:meta',
    'imagemin',
    'htmlmin',
    'prettify',
    'compress',
    'string-replace:build',
    'cleanempty'
  ]);

  grunt.registerTask('build-critical', [
    'compile',
    'test',
    'clean:build',
    'copy:build',
    'copy:meta',
    'imagemin',
    'htmlmin',
    'prettify',
    'compress',
    'compile-critical',
    'string-replace:build',
    'cleanempty'
  ]);

  grunt.registerTask('build-critical-fast', [
    'compile',
    'clean:build',
    'copy:build',
    'copy:meta',
    'imagemin',
    'htmlmin',
    'prettify',
    'compress',
    'compile-critical',
    'string-replace:build',
    'cleanempty'
  ]);

};
