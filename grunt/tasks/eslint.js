module.exports = (_grunt, options) => {
  const { project } = options;

  return {
    options: {
      configFile: '.eslintrc.json',
    },
    test: {
      cwd: project.res.js.devDir,
      src: ['**/*.js'],
      expand: true,
    },
  };
};
