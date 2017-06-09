module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      quality: 80,
    },
    optimize: {
      cwd: project.res.images.dir,
      src: `**/*.${helpers.imageJpegFiles}`,
      dest: project.res.images.dir,
      expand: true,
    },
    meta: {
      cwd: project.build.dir,
      src: `*.${helpers.imageFiles}`,
      dest: project.build.dir,
      expand: true,
    },
  };
};
