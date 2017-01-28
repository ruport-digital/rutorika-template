module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      debug: true,
      keepalive: true,
      port: 8000,
    },
    dev: {
      options: {
        base: project.dir,
      },
    },
    build: {
      options: {
        base: project.build.dir,
      },
    },
  };
};
