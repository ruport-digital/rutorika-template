module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      config: '.csscombrc'
    },
    optimize: {
      cwd: project.res.css.dir,
      src: ['*.css'],
      dest: project.res.css.dir,
      expand: true
    }
  };

};
