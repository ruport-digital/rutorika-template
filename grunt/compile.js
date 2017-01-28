const tx = require('./tx/tx');

module.exports = (grunt, options) => {
  const { project } = options;

  const spritesTasks = [];

  const bitmapSprites = project.res.images.sprites.filter(value => value.split('.').pop() !== 'svg');
  if (bitmapSprites.length > 0) {
    spritesTasks.push('process-sprites');
  }

  const dataURITasks = project.res.images.dataURI.length > 0 ? ['process-dataURI'] : [];

  grunt.registerTask('criticalModernizr', 'Inlining Modernizr', () => tx.criticalModernizr(grunt, project));

  grunt.registerTask('compile', [
    'clean:res',
    ...spritesTasks,
    ...dataURITasks,
    'process-html',
    'process-css',
    'process-js',
  ]);

  grunt.registerTask('compile-critical', [
    'critical',
    'criticalModernizr',
  ]);
};
