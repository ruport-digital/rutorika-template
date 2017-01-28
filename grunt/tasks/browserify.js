module.exports = (grunt, options) => {
  const { project } = options;

  return {
    bundle: {
      options: {
        transform: [
          ['babelify', { presets: ['es2015', ['env', { targets: { browsers: project.browsers } }]] }],
        ],
        browserifyOptions: {
          paths: [project.res.js.comp],
        },
      },
      cwd: project.res.js.devDir,
      src: [
        '*.js',
        `!${project.res.js.service}.js`,
      ],
      dest: project.res.js.dir,
      expand: true,
    },
  };
};
