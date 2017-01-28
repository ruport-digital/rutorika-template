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
    images: {
      cwd: project.build.dir,
      src: [
        `**/*.${helpers.imageFiles}`,
        `!${project.res.fonts.dir.replace(project.dir, '')}**/*.svg`,
        ...helpers.sprites,
      ],
      dest: project.build.dir,
      expand: true,
    },
  };
};
