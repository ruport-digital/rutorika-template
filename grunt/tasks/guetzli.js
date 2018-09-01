module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    options: {
      quality: 80,
    },
    sprites: {
      cwd: project.dir,
      src: [
        ...project.res.images.dataURI.reduce((acc, image) => {
          if (helpers.imageJpegFiles.replace(/\{|\}/ug,'').split(',').indexOf(image.split('.').pop())) acc.push(`${project.res.images.dir.replace(project.dir, '')}${image}`);
          return acc;
        }, []),
      ],
      dest: project.dir,
      expand: true,
    },
    optimize: {
      cwd: project.build.dir,
      src: `*.${helpers.imageJpegFiles}`,
      dest: project.build.dir,
      expand: true,
    },
  };
};
