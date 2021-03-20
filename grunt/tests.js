module.exports = (grunt) => {
  grunt.registerTask('quality', [
    'newer:htmlhint',
    'newer:stylelint',
    'force:csslint',
    'newer:colorguard',
    'newer:eslint',
    'unused:unused',
  ]);

  grunt.registerTask('test', ['quality']);
};
