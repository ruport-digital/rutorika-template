module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      noJunk: true,
    },
    build: {
      src: [`${project.build.dir}**/*`],
    },
  };
};
