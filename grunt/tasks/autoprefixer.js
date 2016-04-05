module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      map: true,
      browsers: project.browsers,
      cascade: false
    },
    prefix: {
      cwd: project.res.css.dir,
      src: ['*.css', '!*-IE.css'],
      dest: project.res.css.dir,
      expand: true
    }
  };

};
