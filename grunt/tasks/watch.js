module.exports = (_grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      spawn: false,
      event: ['added', 'changed'],
      interrupt: true,
    },
    html: {
      files: [`${project.res.templates.dir}**/*.{html,svg}`],
      tasks: ['clean:html', 'processhtml', 'generatePages'],
    },
    images: {
      files: [`**/*.${helpers.imageFiles}`],
      tasks: ['sass:dev', 'postcss', 'processhtml'],
    },
    sass: {
      files: [`${project.res.css.sass}**/*.{scss,sass}`],
      tasks: ['sass:dev', 'postcss'],
    },
    javascript: {
      files: [
        `${project.res.js.devDir}**/*.js`,
        `!${project.res.js.devDir}${project.res.js.service}.js`,
      ],
      tasks: ['browserify:dev'],
    },
    service: {
      files: [`${project.res.js.devDir}${project.res.js.service}.js`],
      tasks: ['copy:serviceDev'],
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
