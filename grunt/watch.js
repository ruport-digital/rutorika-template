module.exports = (grunt) => {
  grunt.registerTask('watch-project', [
    'compile-fast',
    'concurrent',
  ]);
};
