const tx = require('./tx/tx');

module.exports = (grunt, options) => {
  const { project } = options;

  const dataURITasks = project.res.images.dataURI.length > 0 ? ['process-dataURI'] : [];

  grunt.registerTask('criticalModernizr', 'Inlining Modernizr', () => tx.criticalModernizr(grunt, project));

  grunt.registerTask('compile', [
    'clean:res',
    'process-sprites',
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
