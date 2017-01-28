module.exports = (grunt, options) => {
  const { project } = options;

  return {
    optimize: {
      cwd: project.res.css.dir,
      src: ['*.min.css'],
      dest: project.res.css.dir,
      expand: true,
    },
  };
};
