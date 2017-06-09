const pngquant = require('imagemin-pngquant-gfw');

module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      optimizationLevel: 5,
      svgoPlugins: [{
        removeViewBox: false,
      }],
      use: [pngquant()],
    },
    optimize: {
      cwd: project.res.images.dir,
      src: [
        `**/*.${helpers.imageFiles}`,
        `!${project.res.fonts.dir.replace(project.dir, '')}**/*.svg`,
      ],
      dest: project.res.images.dir,
      expand: true,
    },
    meta: {
      cwd: project.build.dir,
      src: `*.${helpers.imageFiles}`,
      dest: project.build.dir,
      expand: true,
    },
  };
};
