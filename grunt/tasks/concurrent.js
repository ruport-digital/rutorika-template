module.exports = () => ({
  options: {
    logConcurrentOutput: true,
    limit: 7,
  },
  projectWatch: [
    'watch:html',
    'watch:images',
    'watch:sass',
    'watch:javascript',
    'watch:service',
    'watch:livereload',
  ],
  projectWatchServer: [
    'watch:html',
    'watch:images',
    'watch:sass',
    'watch:javascript',
    'watch:service',
    'watch:livereload',
    'connect:dev',
  ],
});
