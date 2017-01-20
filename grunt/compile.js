'use strict';

module.exports = (grunt, options) => {

  const project = options.project;
  const tx = require('./tx/tx');

  const spritesTasks = [];

  const bitmapSprites = project.res.images.sprites.filter(value => value.split('.').pop() !== 'svg');
  if (bitmapSprites.length > 0) {
    spritesTasks.push('process-sprites');
  }

  grunt.registerTask('compile', [
    'clean:res',
    ...spritesTasks,
    'process-images',
    'process-html',
    'process-css',
    'process-js'
  ]);

  grunt.registerTask('compile-critical', [
    'critical',
    'criticalModernizr'
  ]);

};
