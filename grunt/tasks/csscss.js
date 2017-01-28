module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      shorthand: false,
      verbose: true,
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
