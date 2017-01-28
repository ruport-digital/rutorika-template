module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      htmlhintrc: '.htmlhintrc',
    },
    test: {
      cwd: project.dir,
      src: ['*.html'],
      expand: true,
    },
  };
};
