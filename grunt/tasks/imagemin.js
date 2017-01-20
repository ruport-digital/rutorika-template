module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  var pngquant = require('imagemin-pngquant-gfw');

  return {
    options: {
      optimizationLevel: 7,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    },
    images: {
      cwd: project.dir,
      src: [
        `**/*.${helpers.imageFiles}`,
        `!${project.res.fonts.dir.replace(project.dir, '')}**/*.svg`,
        ...helpers.sprites
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
