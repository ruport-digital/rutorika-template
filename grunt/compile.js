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
    'process-js',
    'process-css',
    'cleanempty:res',
  ]);

  grunt.registerTask('compile-fast', [
    'sass:dev',
    'postcss',
    'browserify:dev',
    'clean:html',
    'processhtml',
  ]);

  grunt.registerTask('compile-critical', [
    'critical',
    'criticalModernizr',
  ]);
};
