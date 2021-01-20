module.exports = (grunt) => {
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
};
