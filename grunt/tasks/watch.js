module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      spawn: false,
      event: ['added', 'changed'],
      interrupt: true,
    },
    html: {
      files: [`${project.res.templates.dir}**/*.{html,svg}`],
      tasks: [
        'clean:html',
        'processhtml',
        'generatePages',
        'notify:watch_html',
      ],
    },
    images: {
      files: [`**/*.${helpers.imageFiles}`],
      tasks: [
        'sass:dev',
        'postcss',
        'processhtml',
        'notify:watch_images',
      ],
    },
    sass: {
      files: [`${project.res.css.sass}**/*.{scss,sass}`],
      tasks: [
        'sass:dev',
        'postcss',
        'notify:watch_sass',
      ],
    },
    javascript: {
      files: [`${project.res.js.devDir}**/*.js`, `!${project.res.js.devDir}${project.res.js.service}.js`],
      tasks: [
        'browserify:dev',
        'notify:watch_javascript',
      ],
    },
    service: {
      files: [`${project.res.js.devDir}${project.res.js.service}.js`],
      tasks: [
        'copy:serviceDev',
        'notify:watch_service',
      ],
    },
    livereload: {
      options: {
        livereload: true,
      },
      files: [
        `${project.dir}*.html`,
        `${project.dir}**/*.{json,${helpers.imageFiles}}`,
        `${project.res.css.dir}**/*.css`,
        `${project.res.js.dir}**/*.js`,
      ],
    },
  };
};
