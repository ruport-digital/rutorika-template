module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      includeBase: project.res.templates.comp,
      commentMarker: '@tx-process',
      recursive: true
    },
    templates: {
      cwd: project.res.templates.dir,
      src: [
        '*.html',
        '!* copy*.html',
        '!* - Copy*.html'
      ],
      dest: project.dir,
      expand: true
    }
  };

};
