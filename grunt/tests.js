module.exports = (grunt) => {
  grunt.registerTask('quality', [
    'htmlhint',
    'sasslint',
    'csslint',
    'colorguard',
    'eslint',
    'jsinspect',
    'unused:unused',
    'clean:reports',
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
