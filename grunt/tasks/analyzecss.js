module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      outputMetrics: 'error',
      softFail: true,
      thresholds: grunt.file.readJSON('.analyzecssrc'),
    },
    test: {
      cwd: project.res.css.dir,
      src: [
        '*.min.css',
        '!*-IE.min.css',
      ],
      expand: true,
    },
  };
};
