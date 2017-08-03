module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      noJunk: true,
    },
    res: {
      src: [
        `${project.res.css.dir}**/*`,
        `${project.res.js.dir}**/*`,
      ],
    },
    build: {
      src: [`${project.build.dir}**/*`],
    },
  };
};
