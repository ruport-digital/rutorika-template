module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      concurrency: 8,
      ext: '.png',
      quality: '65-80',
      force: true,
      speed: 2,
    },
    optimize: {
      cwd: project.res.images.dir,
      src: `**/*.${helpers.imagePngFiles}`,
      dest: project.res.images.dir,
      expand: true,
    },
    meta: {
      cwd: project.build.dir,
      src: `*.${helpers.imagePngFiles}`,
      dest: project.build.dir,
      expand: true,
    },
  };
};
