module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      csslintrc: '.csslintrc',
    },
    test: {
      cwd: project.res.css.dir,
      src: [
        '*.css',
        '!*.min.css',
        '!*-IE.css',
      ],
      expand: true,
    },
  };
};
