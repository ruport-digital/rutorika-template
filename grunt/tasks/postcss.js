const autoprefixer = require('autoprefixer');

module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      map: true,
      processors: [autoprefixer()],
    },
    process: {
      cwd: project.res.css.dir,
      src: [
        '*.css',
        '!*.min.css',
        '!*-IE.css',
      ],
      dest: project.res.css.dir,
      expand: true,
    },
  };
};
