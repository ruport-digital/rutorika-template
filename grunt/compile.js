const tx = require('./tx/tx');

module.exports = (grunt, options) => {
  const { project } = options;

  grunt.registerTask('criticalModernizr', 'Inlining Modernizr', () => tx.criticalModernizr(grunt, project));

  grunt.registerTask('compile', [
    'clean:res',
    'process-sprites',
    'process-html',
    'process-js',
    'process-css',
    'cleanempty:res',
  ]);

  grunt.registerTask('compile-fast', [
    'sass:dev',
    'postcss',
    'browserify:dev',
    'copy:serviceDev',
    'clean:html',
    'processhtml',
    'generatePages',
  ]);

  grunt.registerTask('compile-critical', [
    'critical',
    'criticalModernizr',
  ]);
};
