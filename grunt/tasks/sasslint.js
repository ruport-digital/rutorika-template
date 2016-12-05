module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      configFile: '.sass-lint.yml',
      formatter: 'stylish'
    },
    test: {
      cwd: project.res.css.sass,
      src: ['**/*.{scss,sass}', '!**/*-IE.{scss,sass}'],
      expand: true
    }
  };

};
