module.exports = (_grunt, options) => {
  const { project } = options;

  return {
    options: {
      reference: project.res.images.dir,
      directory: [
        `${project.dir}*.html`,
        `${project.res.css.dir}*.css`,
        `${project.res.js.dir}*.js`,
      ],
    },
  };
};
