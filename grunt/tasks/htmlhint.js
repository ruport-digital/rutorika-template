module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      htmlhintrc: '.htmlhintrc'
    },
    test: {
      cwd: project.dir,
      src: ['*.html'],
      expand: true
    }
  };

};
