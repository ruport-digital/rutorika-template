module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    options: {
      shorthand: false,
      verbose: true
    },
    test: {
      cwd: project.res.css.dir,
      src: [
        '*.css',
        '!*.min.css',
        '!*-IE.css'
      ],
      expand: true
    }
  };

};
