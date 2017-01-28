module.exports = (grunt, options) => {
  const { project } = options;

  return {
    test: {
      cwd: project.res.js.devDir,
      src: ['**/*.js'],
      expand: true,
    },
  };
};
