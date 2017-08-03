module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      optimizationLevel: 5,
      svgoPlugins: [{
        removeTitle: true,
      }, {
        removeDesc: true,
      }, {
        removeViewBox: false,
      }, {
        removeUselessDefs: false,
      }, {
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
      }, {
        cleanupIDs: false,
      }],
    },
    optimize: {
      cwd: project.res.dir,
      src: [
        `**/*.${helpers.imageFiles}`,
        `!${project.res.fonts.dir.replace(project.dir, '')}**/*.svg`,
      ],
      dest: project.res.dir,
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
