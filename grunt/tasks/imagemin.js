const gifsicle = require('imagemin-gifsicle');
const jpegtran = require('imagemin-jpegtran');
const optipng = require('imagemin-optipng');
const svgo = require('imagemin-svgo');
const pngcrush = require('imagemin-pngcrush');
const pngquant = require('imagemin-pngquant');

const SVGO_OPTIONS = {
  plugins: [
    { removeTitle: true },
    { removeDesc: true },
    { removeViewBox: false },
    { removeUselessDefs: false },
    { removeXMLNS: true },
    { removeRasterImages: true },
    { cleanupIDs: false },
    {
      removeAttrs: {
        attrs: [
          'g:id',
          'path:id',
          'line:id',
          'rect:id',
          'circle:id',
          'fill-rule',
          'stroke-linecap',
          'stroke-linejoin',
        ],
      },
    },
  ],
};

module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      use: [
        gifsicle({ optimizationLevel: 2 }),
        jpegtran({ progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo(SVGO_OPTIONS),
        pngcrush(),
        pngquant(),
      ],
    },
    sprites: {
      cwd: project.dir,
      src: [
        `${project.res.templates.comp.replace(project.dir, '')}**/*.svg`,
        ...project.res.images.dataURI.map(image => `${project.res.images.dir.replace(project.dir, '')}${image}`),
      ],
      dest: project.dir,
      expand: true,
    },
    optimize: {
      cwd: project.build.dir,
      src: [
        `**/*.${helpers.imageFiles}`,
        `!${project.res.fonts.dir.replace(project.dir, '')}**/*.svg`,
      ],
      dest: project.build.dir,
      expand: true,
    },
  };
};
