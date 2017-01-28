module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      configFile: '.sass-lint.yml',
      formatter: 'stylish',
    },
    test: {
      cwd: project.res.css.sass,
      src: [
        '**/*.{scss,sass}',
        '!**/*-IE.{scss,sass}',
        `!${helpers.txpath}{scss,sass}`,
      ],
      expand: true,
    },
  };
};
