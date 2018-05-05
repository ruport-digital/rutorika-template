module.exports = (grunt) => {
  grunt.registerTask('watch-project', [
    'compile-fast',
    'concurrent:projectWatch',
  ]);

  grunt.registerTask('watch-project-server', [
    'force:compile-fast',
    'notify:connect_start',
    'concurrent:projectWatchServer',
  ]);
};
