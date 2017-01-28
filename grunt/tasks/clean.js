module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    res: [
      project.res.css.dir,
      `${project.res.js.dir}*.js`,
    ],
    html: [
      `${project.dir}*.html`,
    ],
    images: [
      `${project.res.css.sass}${helpers.scss}${helpers.temp}`,
    ],
    reports: [
      '*.css',
    ],
    build: [
      project.build.dir,
    ],
  };
};
