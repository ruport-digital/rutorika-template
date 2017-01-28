module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: grunt.file.readJSON('.htmlminrc'),
    optimize: {
      cwd: project.build.dir,
      src: ['*.html'],
      dest: project.build.dir,
      expand: true,
    },
  };
};
