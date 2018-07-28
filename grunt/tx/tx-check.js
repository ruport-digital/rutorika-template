function checkDirs(grunt, config) {
  grunt.file.mkdir(config.project.res.js.dir);
  grunt.file.mkdir(config.project.res.css.dir);
}

module.exports = (grunt, config) => {
  checkDirs(grunt, config);
};
