module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      config: '.jshintrc'
    },
    optimize: {
      cwd: project.res.js.dir,
      src: ['*.js'],
      dest: project.res.js.dir,
      expand: true
    }
  };

};
