module.exports = (grunt, options) => {
  const { project, helpers } = options;
  const ignoredFiles = helpers.uncssIgnoreFiles.map(file => `!${project.dir}${file}`);

  return {
    options: {
      ignore: helpers.uncssIgnoreClasses,
      timeout: 1000,
    },
    optimize: {
      files: { [`${project.res.css.dir}${project.res.css.filename}.css`]: [`${project.dir}*.html`, ...ignoredFiles] },
    },
  };
};
