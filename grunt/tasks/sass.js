/* eslint-disable import/no-extraneous-dependencies */
const sass = require('node-sass');

module.exports = (_grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      sourceMap: true,
      precision: 2,
      implementation: sass,
      includePaths: [project.res.css.comp, ...helpers.externalResources],
      outputStyle: 'expanded',
    },
    dev: {
      cwd: project.res.css.sass,
      src: ['**/*.{scss,sass,css}'],
      dest: project.res.css.dir,
      ext: '.min.css',
      expand: true,
    },
    build: {
      cwd: project.res.css.sass,
      src: ['**/*.{scss,sass,css}'],
      dest: project.res.css.dir,
      ext: '.css',
      expand: true,
    },
  };
};
