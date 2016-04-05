'use strict';

module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;
  var tx = require('./tx/tx');

  var imageCondition = project.res.images.dataURI.length > 0;
  var imageTasks = ['imagemin:images', 'process-dataURI', 'clean:images'];
  var imageTask = 'process-dataURI';
  var imageTaskIndex = 1;

  grunt.registerTask('criticalModernizr', 'Inlining Modernizr', _ => {
    tx.criticalModernizr(grunt, project);
  });

  grunt.registerTask('dataURIFallback', 'Fallback classes for the images in DataURI', _ => {
    tx.dataURIFallback(grunt, project, helpers);
  });

  grunt.registerTask('dataURICleanup', 'Cleanup DataURI placeholders', _ => {
    tx.dataURICleanup(grunt, project, helpers);
  });

  grunt.registerTask('spritesSCSS', 'SCSS variables with sprites data', _ => {
    tx.spritesSCSS(grunt, project, helpers);
  });

  grunt.registerTask('imageTasks', 'Compiling images', _ => {
    tx.conditionalTask(grunt, project, imageCondition, imageTasks, imageTask, imageTaskIndex);
  });

  grunt.registerTask('process-dataURI', [
    'datauri',
    'dataURIFallback',
    'concat:dataURI',
    'dataURICleanup'
  ]);

  grunt.registerTask('process-sprites', [
    'sprite',
    'spritesSCSS'
  ]);

  grunt.registerTask('process-images', [
    'imageTasks'
  ]);

  grunt.registerTask('process-html', [
    'processhtml'
  ]);

  grunt.registerTask('process-css', [
    'sass',
    'autoprefixer',
    'uncss',
    'csscomb',
    'string-replace:css',
    'cssc',
    'cssmin'
  ]);

  grunt.registerTask('process-js', [
    'browserify',
    'copy:service',
    'fixmyjs',
    'string-replace:jsHint',
    'uglify'
  ]);

};
