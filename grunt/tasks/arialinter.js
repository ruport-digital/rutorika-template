module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      level: 'A'
    },
    test: {
      cwd: project.build.dir,
      src: ['*.html'],
      expand: true
    }
  };

};
