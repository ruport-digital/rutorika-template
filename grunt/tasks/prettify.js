module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      config: '.jsbeautifyrc',
    },
    build: {
      cwd: project.build.dir,
      src: ['*.html'],
      dest: project.build.dir,
      expand: true,
    },
    dev: {
      cwd: project.dir,
      src: ['*.html'],
      dest: project.dir,
      expand: true,
    },
  };
};
