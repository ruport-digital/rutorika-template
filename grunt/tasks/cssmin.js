module.exports = (grunt, options) => {

  var project = options.project;

  return {
    optimize: {
      cwd: project.res.css.dir,
      src: ['*.min.css'],
      dest: project.res.css.dir,
      expand: true
    }
  };

};
