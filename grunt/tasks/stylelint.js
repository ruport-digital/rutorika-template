module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      configFile: '.stylelintrc.json',
      formatter: 'string',
    },
    test: {
      cwd: project.res.css.sass,
      src: [
        '**/*.{scss,sass}',
        '!**/*-IE.{scss,sass}',
      ],
      expand: true,
    },
  };
};
