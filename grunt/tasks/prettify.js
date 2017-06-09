module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      config: '.jsbeautifyrc',
    },
    optimize: {
      cwd: project.dir,
      src: ['*.html'],
      dest: project.dir,
      expand: true,
    },
  };
};
