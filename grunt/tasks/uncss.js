module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;
  var ignoredFiles = helpers.uncssIgnoreFiles.map(file => `!${project.dir}${file}`);

  return {
    options: {
      ignore: helpers.uncssIgnoreClasses,
      timeout: 1000
    },
    optimize: {
      files: {[`${project.res.css.dir}${project.res.css.filename}.css`]: [`${project.dir}*.html`, ...ignoredFiles]}
    }
  };

};
