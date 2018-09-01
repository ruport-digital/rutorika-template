const tx = require('./tx/tx');

module.exports = (grunt, options) => {
  const { project, helpers } = options;

  const dataURITasks = project.res.images.dataURI.length > 0 ? ['process-dataURI'] : [];

  grunt.registerTask('dataURIFallback', 'Fallback classes for the images in DataURI', () => tx.dataURIFallback(grunt, project, helpers));

  grunt.registerTask('dataURICleanup', 'Cleanup DataURI placeholders', () => tx.dataURICleanup(grunt, project, helpers));

  grunt.registerTask('spritesSCSS', 'SCSS variables with sprites data', () => tx.spritesSCSS(grunt, project, helpers));

  grunt.registerTask('generatePages', 'Generate HTML-file with links to all of the pages', () => tx.generatePages(grunt, project, helpers));

  grunt.registerTask('process-dataURI', [
    'datauri',
    'dataURIFallback',
    'concat:dataURI',
    'dataURICleanup',
    'clean:images',
  ]);

  grunt.registerTask('process-sprites', [ ...tx.processSprites(grunt, project, helpers), ...dataURITasks ]);

  grunt.registerTask('process-raster-sprites', [
    'sprite',
    'spritesSCSS',
  ]);

  grunt.registerTask('process-vector-sprites', [
    'svgstore',
  ]);

  grunt.registerTask('process-sprite-images', [
    'imagemin:sprites',
    'pngmin:sprites',
    // 'newer:guetzli:sprites',
  ]);

  grunt.registerTask('process-build-images', [
    'newer:imagemin:optimize',
    'newer:pngmin:optimize',
    // 'newer:guetzli:optimize',
  ]);

  grunt.registerTask('process-html', [
    'clean:html',
    'processhtml',
    'generatePages',
    'htmlmin',
    'prettify',
    'string-replace:html',
  ]);

  grunt.registerTask('process-css', [
    'sass:build',
    'postcss',
    'csscomb',
    'cssc',
    'uncss',
    'string-replace:css',
    'cssmin',
  ]);

  grunt.registerTask('process-js', [
    'browserify:build',
    'copy:serviceBuild',
    'string-replace:js',
    'uglify',
  ]);

  grunt.registerTask('process-build', [
    'clean:build',
    'copy:build',
    'copy:meta',
  ]);

  grunt.registerTask('process-finalize', [
    // 'compress',
    'process-build-images',
    'string-replace:build',
    'clean:reports',
    'cleanempty',
  ]);
};
