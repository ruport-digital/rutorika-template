module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      config: '.csscombrc',
    },
    optimize: {
      cwd: project.res.css.dir,
      src: ['*.css'],
      dest: project.res.css.dir,
      expand: true,
    },
  };
};
