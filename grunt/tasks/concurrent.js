module.exports = (grunt, options) => {

  return {
    options: {
      logConcurrentOutput: true,
      limit: 5
    },
    projectWatch: [
      'watch:html',
      'watch:images',
      'watch:sass',
      'watch:javascript',
      'watch:livereload'
    ]
  };

};
