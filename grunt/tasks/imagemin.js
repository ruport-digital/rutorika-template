module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    options: {
      optimizationLevel: 3,
      svgoPlugins: [{
        removeViewBox: false
      }]
    },
    images: {
      cwd: project.dir,
      src: [
        `**/*.${helpers.imageFiles}`,
        `!${project.res.fonts.dir.replace(project.dir, '')}**/*.svg`,
        ...helpers.dontCopy
      ],
      dest: project.dir,
      expand: true
    },
    meta: {
      cwd: project.build.dir,
      src: [`*.${helpers.imageFiles}`],
      dest: project.build.dir,
      expand: true
    }
  };

};
