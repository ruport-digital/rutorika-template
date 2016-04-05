module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    res: [project.res.css.dir, `${project.res.js.dir}*.js`],
    images: [`${project.res.css.sass}${helpers.scss}${helpers.temp}`],
    reports: [`*.css`],
    build: [project.build.dir]
  };

};
