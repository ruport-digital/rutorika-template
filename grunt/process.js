const tx = require('./tx/tx');

module.exports = (grunt, options) => {
  const { project, helpers } = options;

  grunt.registerTask('dataURIFallback', 'Fallback classes for the images in DataURI', () => tx.dataURIFallback(grunt, project, helpers));

  grunt.registerTask('dataURICleanup', 'Cleanup DataURI placeholders', () => tx.dataURICleanup(grunt, project, helpers));

  grunt.registerTask('spritesSCSS', 'SCSS variables with sprites data', () => tx.spritesSCSS(grunt, project, helpers));

  grunt.registerTask('process-dataURI', [
    'datauri',
    'dataURIFallback',
    'concat:dataURI',
    'dataURICleanup',
  ]);

  grunt.registerTask('process-sprites', [
    'sprite',
    'spritesSCSS',
    'clean:images',
  ]);

  grunt.registerTask('process-images', [
    'newer:imagemin:optimize',
    // 'newer:guetzli:optimize',
  ]);

  grunt.registerTask('process-html', [
    'clean:html',
    'processhtml',
    'htmlmin',
    'prettify',
    'string-replace:html',
  ]);

  grunt.registerTask('process-css', [
    'sass:build',
    'postcss',
    'csscomb',
    'cssc',
    // 'uncss',
    'string-replace:css',
    'cssmin',
  ]);

  grunt.registerTask('process-js', [
    'browserify:build',
    'copy:service',
    'string-replace:js',
    'uglify',
  ]);

  grunt.registerTask('process-build', [
    'clean:build',
    'copy:build',
    'copy:meta',
  ]);

  grunt.registerTask('process-finalize', [
    'compress',
    'imagemin:meta',
    // 'newer:guetzli:meta',
    'string-replace:build',
    'clean:reports',
    'cleanempty',
  ]);
};
