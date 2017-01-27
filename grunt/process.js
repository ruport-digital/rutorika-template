'use strict';

module.exports = (grunt, options) => {

  const project = options.project;
  const helpers = options.helpers;
  const tx = require('./tx/tx');

  grunt.registerTask('dataURIFallback', 'Fallback classes for the images in DataURI', _ => tx.dataURIFallback(grunt, project, helpers));

  grunt.registerTask('dataURICleanup', 'Cleanup DataURI placeholders', _ => tx.dataURICleanup(grunt, project, helpers));

  grunt.registerTask('spritesSCSS', 'SCSS variables with sprites data', _ => tx.spritesSCSS(grunt, project, helpers));

  grunt.registerTask('process-dataURI', [
    'datauri',
    'dataURIFallback',
    'concat:dataURI',
    'dataURICleanup'
  ]);

  grunt.registerTask('process-sprites', [
    'sprite',
    'spritesSCSS',
    'clean:images'
  ]);

  grunt.registerTask('process-html', [
    'clean:html',
    'processhtml'
  ]);

  grunt.registerTask('process-css', [
    'sass',
    'csscss',
    'postcss',
    'uncss',
    'csscomb',
    'cssc',
    'string-replace:css',
    'cssmin'
  ]);

  grunt.registerTask('process-js', [
    'browserify',
    'copy:service',
    'string-replace:js',
    'uglify'
  ]);

};
