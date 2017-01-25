'use strict';

module.exports = (grunt) => {

  grunt.registerTask('quality', [
    'htmlhint',
    'scsslint',
    'csslint',
    'csscss',
    'colorguard',
    'jscs',
    'jshint',
    'jsinspect',
    'clean:reports'
  ]);

  grunt.registerTask('performance', [
    'analyzecss'
  ]);

  grunt.registerTask('test', [
    'mochaTest',
    'quality',
    'performance'
  ]);

};
