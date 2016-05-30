module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      map: true,
      processors: [
        require('autoprefixer')({browsers: project.browsers})
      ]
    },
    process: {
      cwd: project.res.css.dir,
      src: ['*.css', '!*.min.css', '!*-IE.css'],
      dest: project.res.css.dir,
      expand: true
    }
  };

};
