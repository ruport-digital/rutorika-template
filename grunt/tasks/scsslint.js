module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      colorizeOutput: true
    },
    test: {
      cwd: project.res.css.sass,
      src: ['**/*.{scss,sass}', '!**/*-IE.{scss,sass}'],
      expand: true
    }
  };

};
