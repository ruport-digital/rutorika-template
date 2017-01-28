module.exports = () => ({
  options: {
    logConcurrentOutput: true,
    limit: 5,
  },
  projectWatch: [
    'watch:html',
    'watch:images',
    'watch:sass',
    'watch:javascript',
    'watch:livereload',
  ],
});
