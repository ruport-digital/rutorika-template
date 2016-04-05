module.exports = (grunt, options) => {

  var project = options.project;

  return {
    test: {
      cwd: project.res.css.sass,
      src: ['**/*.{scss,sass}', '!**/*-IE.{scss,sass}'],
      expand: true
    }
  };

};
