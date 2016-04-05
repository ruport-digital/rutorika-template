'use strict';

module.exports = (grunt, options) => {

  var project = options.project;
  var tx = require('./tx/tx');

  var compileCondition = project.res.images.sprites.length > 0;
  var compileTasks = ['clean:res', 'process-images', 'process-html', 'process-css', 'process-js'];
  var compileTask = 'process-sprites';
  var compileTaskIndex = 1;

  grunt.registerTask('compile', 'Compiling', _ => {
    tx.conditionalTask(grunt, project, compileCondition, compileTasks, compileTask, compileTaskIndex);
  });

  grunt.registerTask('compile-critical', [
    'critical',
    'criticalModernizr'
  ]);

};
