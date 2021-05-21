module.exports = (grunt) => {
  grunt.registerTask('build', [
    'compile',
    'test',
    'process-build',
    'process-finalize',
  ]);

  grunt.registerTask('build-fast', [
    'compile',
    'process-build',
    'process-finalize',
  ]);
};
