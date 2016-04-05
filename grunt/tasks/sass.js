module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      sourceMap: true,
      precision: 5
    },
    generate: {
      cwd: project.res.css.sass,
      src: ['**/*.{scss,sass}'],
      dest: project.res.css.dir,
      ext: '.css',
      expand: true
    }
  };

};
