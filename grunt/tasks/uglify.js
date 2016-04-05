module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      preserveComments: false
    },
    optimize: {
      cwd: project.res.js.dir,
      src: ['*.js'],
      dest: project.res.js.dir,
      ext: '.min.js',
      expand: true
    }
  };

};
