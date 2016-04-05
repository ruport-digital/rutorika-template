module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      csslintrc: '.csslintrc'
    },
    test: {
      cwd: project.res.css.dir,
      src: ['*.css', '!*.min.css', '!*-IE.css'],
      expand: true
    }
  };

};
