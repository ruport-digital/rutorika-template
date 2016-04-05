module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: grunt.file.readJSON('.htmlminrc'),
    optimize: {
      cwd: project.build.dir,
      src: ['*.html'],
      dest: project.build.dir,
      expand: true
    }
  };

};
