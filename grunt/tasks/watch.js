module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return {
    options: {
      spawn: false
    },
    html: {
      files: [`${project.res.templates.dir}**/*.html`],
      tasks: [
        'clean:html',
        'processhtml'
      ]
    },
    images: {
      files: [`**/*.${helpers.imageFiles}`],
      tasks: [
        'sass',
        'postcss',
        'processhtml'
      ]
    },
    sass: {
      files: [`${project.res.css.sass}**/*.{scss,sass}`],
      tasks: [
        'sass',
        'postcss'
      ]
    },
    javascript: {
      files: [`${project.res.js.devDir}**/*.js`, `!${project.res.js.devDir}${project.res.js.service}.js`],
      tasks: ['browserify']
    },
    livereload: {
      options: {
        livereload: true
      },
      files: [
        `${project.dir}*.html`,
        `${project.res.css.dir}**/*.css`,
        `${project.res.js.dir}**/*.{js,json}`,
        `${project.dir}**/*.${helpers.imageFiles}`
      ]
    }
  };

};
