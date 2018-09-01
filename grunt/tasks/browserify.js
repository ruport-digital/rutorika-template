module.exports = (grunt, options) => {
  const { project } = options;

  return {
    options: {
      transform: [
        [
          'babelify',
          {
            presets: [
              ['@babel/preset-env', { targets: { browsers: project.browsers } }],
            ],
            plugins: ['lodash', 'sitrep'],
          },
        ],
      ],
      cacheFile: './browserify-cache.json',
      browserifyOptions: {
        paths: [project.res.js.comp],
      },
    },
    dev: {
      cwd: project.res.js.devDir,
      src: [
        '*.js',
        `!${project.res.js.service}.js`,
      ],
      dest: project.res.js.dir,
      ext: '.min.js',
      expand: true,
    },
    build: {
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
