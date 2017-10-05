module.exports = () => ({
  options: {
    logConcurrentOutput: true,
    limit: 6,
  },
  projectWatch: [
    'watch:html',
    'watch:images',
    'watch:sass',
    'watch:javascript',
    'watch:livereload',
  ],
  projectWatchServer: [
    'watch:html',
    'watch:images',
    'watch:sass',
    'watch:javascript',
    'watch:livereload',
    'connect:dev',
  ],
});
