module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    serviceDev: {
      cwd: project.res.js.devDir,
      src: `${project.res.js.service}.js`,
      dest: project.res.js.dir,
      ext: '.min.js',
      expand: true,
    },
    serviceBuild: {
      cwd: project.res.js.devDir,
      src: `${project.res.js.service}.js`,
      dest: project.res.js.dir,
      expand: true,
    },
    build: {
      cwd: project.dir,
      src: [
        '**/*.*',
        `!${project.res.templates.dir.replace(project.dir, '')}/**`,
        `!${project.res.css.sass.replace(project.dir, '')}/**`,
        ...helpers.dontCopy,
      ],
      dest: project.build.dir,
      expand: true,
    },
    meta: {
      cwd: project.meta,
      src: ['**/*.*'],
      dest: project.build.dir,
      expand: true,
    },
  };
};
