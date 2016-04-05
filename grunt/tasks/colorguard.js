module.exports = (grunt, options) => {

  var project = options.project;

  return {
    test: {
      cwd: project.res.css.dir,
      src: ['*.css', '!*.min.css', '!*-IE.css'],
      expand: true
    }
  };

};
