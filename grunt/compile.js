const tx = require('./tx/tx');

module.exports = (grunt, options) => {
  const { project, helpers } = options;

  const spritesTasks = [];

  const rasterSprites = project.res.images.sprites.filter(value => value.split('.').pop() !== helpers.imageVectorFiles);
  if (rasterSprites.length > 0) {
    spritesTasks.push('process-raster-sprites');
  }

  const vectorSprites = project.res.images.sprites.filter(value => value.split('.').pop() === helpers.imageVectorFiles);
  if (vectorSprites.length > 0) {
    spritesTasks.push('process-vector-sprites');
  }

  const dataURITasks = project.res.images.dataURI.length > 0 ? ['process-dataURI'] : [];

  grunt.registerTask('criticalModernizr', 'Inlining Modernizr', () => tx.criticalModernizr(grunt, project));

  grunt.registerTask('compile', [
    'clean:res',
    ...spritesTasks,
    'process-images',
    ...dataURITasks,
    'process-html',
    'process-css',
    'process-js',
    'cleanempty:res',
  ]);

  grunt.registerTask('compile-critical', [
    'critical',
    'criticalModernizr',
  ]);
};
