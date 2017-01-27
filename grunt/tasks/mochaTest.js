module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      quiet: false
    },
    test: {
      cwd: project.tests.mocha,
      src: ['*.js'],
      expand: true
    }
  };

};
