module.exports = (grunt) => {
  grunt.registerTask('build', [
    'compile',
    'test',
    'process-build',
    'process-finalize',
    'notify:build',
  ]);

  grunt.registerTask('build-fast', [
    'compile',
    'process-build',
    'process-finalize',
    'notify:build',
  ]);

  grunt.registerTask('build-critical', [
    'compile',
    'test',
    'process-build',
    'compile-critical',
    'process-finalize',
    'notify:build',
  ]);

  grunt.registerTask('build-critical-fast', [
    'compile',
    'process-build',
    'compile-critical',
    'process-finalize',
    'notify:build',
  ]);
};
