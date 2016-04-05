module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    options: {
      ignore: helpers.uncssIgnore,
      timeout: 1000
    },
    optimize: {
      files: {
        [`${project.res.css.dir}${project.res.css.filename}.css`]: `${project.dir}*.html`
      }
    }
  };

};
