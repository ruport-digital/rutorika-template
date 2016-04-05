module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      css: `${project.res.css.dir}${project.res.css.filename}.css`,
      dimensions: [{
        width: project.build.critical.widthDesktop,
        height: project.build.critical.heightDesktop,
      }, {
        width: project.build.critical.widthMobile,
        height: project.build.critical.heightMobile,
      }],
      minify: true,
      extract: false
    },
    optimize: {
      cwd: project.build.dir,
      src: ['*.html'],
      dest: project.build.dir,
      expand: true
    }
  };

};
