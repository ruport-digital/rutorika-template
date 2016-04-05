module.exports = (grunt, options) => {

  var project = options.project;

  return {
    res: {
      options: {
        mode: 'gzip'
      },
      cwd: project.build.dir,
      src: ['**/*.min.{css,js}'],
      dest: project.build.dir,
      ext: '.gz',
      extDot: 'last',
      expand: true
    }
  };

};
