module.exports = (grunt, options) => {

  var project = options.project;

  return {
    desktop: {
      options: {
        screenshots: project.tests.phantomcss.screenshots,
        results: project.tests.phantomcss.results
      },
      cwd: project.tests.phantomcss.dir,
      src: ['*.js'],
      expand: true
    }
  };

};
