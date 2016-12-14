module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      sourceMap: true,
      precision: 2,
      includePaths: [project.res.css.comp],
      outputStyle: 'expanded'
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
