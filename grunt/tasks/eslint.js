module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      configFile: '.eslintrc',
    },
    test: {
      cwd: project.res.js.devDir,
      src: ['**/*.js'],
      expand: true,
    },
  };
};
