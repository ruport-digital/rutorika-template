module.exports = (grunt) => {
  grunt.registerTask('build', [
    'compile',
    'test',
    'clean:build',
    'copy:build',
    'copy:meta',
    'imagemin',
    // 'guetzli',
    'htmlmin',
    'prettify',
    'compress',
    'string-replace:build',
    'clean:reports',
    'cleanempty',
  ]);

  grunt.registerTask('build-fast', [
    'compile',
    'clean:build',
    'copy:build',
    'copy:meta',
    'imagemin',
    // 'guetzli',
    'htmlmin',
    'prettify',
    'compress',
    'string-replace:build',
    'clean:reports',
    'cleanempty',
  ]);

  grunt.registerTask('build-critical', [
    'compile',
    'test',
    'clean:build',
    'copy:build',
    'copy:meta',
    'imagemin',
    // 'guetzli',
    'htmlmin',
    'prettify',
    'compress',
    'compile-critical',
    'string-replace:build',
    'clean:reports',
    'cleanempty',
  ]);

  grunt.registerTask('build-critical-fast', [
    'compile',
    'clean:build',
    'copy:build',
    'copy:meta',
    'imagemin',
    // 'guetzli',
    'htmlmin',
    'prettify',
    'compress',
    'compile-critical',
    'string-replace:build',
    'clean:reports',
    'cleanempty',
  ]);
};
