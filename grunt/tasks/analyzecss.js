module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      outputMetrics: 'error',
      softFail: true,
      thresholds: grunt.file.readJSON('.analyzecssrc')
    },
    test: {
      cwd: project.res.css.dir,
      src: ['*.min.css', '!*-IE.min.css'],
      expand: true
    }
  };

};
