module.exports = (grunt, options) => {

  var project = options.project;

  return {
    test: {
      cwd: project.res.js.devDir,
      src: ['**/*.js'],
      expand: true
    }
  };

};
