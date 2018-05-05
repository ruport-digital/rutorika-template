module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      includeBase: project.res.templates.comp,
      commentMarker: '@tx-process',
      recursive: true,
    },
    templates: {
      cwd: project.res.templates.dir,
      src: [
        '*.html',
        '!* copy*.html',
        '!* - Copy*.html',
        '!* copie*.html',
      ],
      dest: project.dir,
      expand: true,
    },
  };
};
