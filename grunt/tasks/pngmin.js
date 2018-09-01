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
    sprites: {
      cwd: project.dir,
      src: [
        ...project.res.images.dataURI.reduce((acc, image) => {
          if (image.split('.').pop() === helpers.imagePngFiles) acc.push(`${project.res.images.dir.replace(project.dir, '')}${image}`);
          return acc;
        }, []),
      ],
      dest: project.dir,
      expand: true,
    },
    optimize: {
      cwd: project.build.dir,
      src: `**/*.${helpers.imagePngFiles}`,
      dest: project.build.dir,
      expand: true,
    },
  };
};
