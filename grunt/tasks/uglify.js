module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      preserveComments: false,
    },
    optimize: {
      cwd: project.res.js.dir,
      src: [
        '*.js',
        '!*.min.js',
      ],
      dest: project.res.js.dir,
      ext: '.min.js',
      expand: true,
    },
  };
};
