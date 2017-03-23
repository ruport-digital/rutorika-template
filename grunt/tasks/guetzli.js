module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    images: {
      cwd: project.build.dir,
      src: [
        `**/*.${helpers.imageJpegFiles}`,
        ...helpers.sprites,
      ],
      dest: project.build.dir,
      expand: true,
    },
    options: {
      quality: 84,
    },
  };
};
