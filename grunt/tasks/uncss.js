module.exports = (grunt, options) => {
  const { project, helpers } = options;
  const ignoredFiles = helpers.uncssIgnoreFiles.map(file => `!${project.dir}${file}`);
  const files = {};

  grunt.file.recurse(project.res.css.dir, (absPath) => {
    const pathArray = absPath.split('.');
    const extension = pathArray.pop();
    const min = pathArray.pop();
    if ((extension === 'css') && (min === 'min')) {
      files[absPath] = [`${project.dir}*.html`, ...ignoredFiles];
    }
  });

  return {
    options: {
      ignore: helpers.uncssIgnoreClasses,
    },
    optimize: { files },
  };
};
