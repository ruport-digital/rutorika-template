module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      quiet: false,
    },
    test: {
      cwd: project.tests.mocha,
      src: ['*.js'],
      expand: true,
    },
  };
};
