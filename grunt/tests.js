'use strict';

module.exports = (grunt) => {

  grunt.registerTask('quality', [
    'htmlhint',
    'arialinter',
    'sasslint',
    'csslint',
    'csscss',
    'colorguard',
    'eslint',
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
