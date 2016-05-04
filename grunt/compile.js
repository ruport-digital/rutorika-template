'use strict';

module.exports = (grunt, options) => {

  var project = options.project;
  var tx = require('./tx/tx');

  var compileCondition = project.res.images.sprites.length > 0;
  var compileConditionalTask = 'process-sprites';
  var compileConditionalTaskIndex = 1;
  var compileTasks = [
    'clean:res',
    'process-images',
    'process-html',
    'process-css',
    'process-js'
  ];

  grunt.registerTask('compile', 'Compiling', _ => tx.conditionalTask(grunt, project, compileCondition, compileTasks, compileConditionalTask, compileConditionalTaskIndex));

  grunt.registerTask('compile-critical', [
    'critical',
    'criticalModernizr'
  ]);

};
