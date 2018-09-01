module.exports = (grunt) => {
  grunt.registerTask('watch-project', [
    'clean:res',
    'force:compile-fast',
    'concurrent:projectWatch',
  ]);

  grunt.registerTask('watch-project-server', [
    'clean:res',
    'force:compile-fast',
    'notify:connect_start',
    'concurrent:projectWatchServer',
  ]);
};
