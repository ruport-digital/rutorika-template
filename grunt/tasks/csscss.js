module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    options: {
      shorthand: false,
      verbose: true,
      ignoreSassMixins: true,
    },
    test: {
      cwd: project.res.css.sass,
      src: [
        '**/*.{scss,sass}',
        '!**/*-IE.{scss,sass}',
        `!${helpers.txpath}{scss,sass}`
      ],
      expand: true
    }
  };

};
