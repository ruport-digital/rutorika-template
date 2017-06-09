module.exports = (grunt) => {
  grunt.registerTask('quality', [
    'newer:htmlhint',
    'newer:sasslint',
    'newer:csslint',
    'newer:colorguard',
    'newer:eslint',
    'newer:jsinspect',
    'unused:unused',
  ]);

  grunt.registerTask('performance', [
    'analyzecss',
  ]);

  grunt.registerTask('test', [
    'mochaTest',
    'quality',
    'performance',
  ]);
};
