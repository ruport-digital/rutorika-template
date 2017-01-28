module.exports = (grunt, options) => {
  const { project } = options;

  return {
    res: {
      options: {
        mode: 'gzip',
      },
      cwd: project.build.dir,
      src: ['**/*.min.{css,js}'],
      dest: project.build.dir,
      ext: '.gz',
      extDot: 'last',
      expand: true,
    },
  };
};
