module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      configFile: '.eslintrc'
    },
    test: {
      cwd: project.res.js.devDir,
      src: ['*.js', `${project.res.js.comp.replace(project.dir, '')}/**/*.js`, `!${project.res.js.service}.js`],
      expand: true
    }
  };

};
