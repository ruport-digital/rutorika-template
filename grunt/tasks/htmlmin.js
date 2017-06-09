module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: grunt.file.readJSON('.htmlminrc'),
    optimize: {
      cwd: project.dir,
      src: ['*.html'],
      dest: project.dir,
      expand: true,
    },
  };
};
