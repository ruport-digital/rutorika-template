module.exports = (grunt, options) => {
  const { project } = options;
  const files = [];

  if (grunt.file.exists(project.build.dir)) {
    grunt.file.recurse(project.res.css.dir.replace(project.dir, project.build.dir), (absPath) => {
      const pathArray = absPath.split('.');
      const extension = pathArray.pop();
      const min = pathArray.pop();
      if ((extension === 'css') && (min === 'min')) {
        files.push(absPath);
      }
    });
  }

  return {
    options: {
      css: files,
      dimensions: [{
        width: project.build.critical.widthDesktop,
        height: project.build.critical.heightDesktop,
      }, {
        width: project.build.critical.widthMobile,
        height: project.build.critical.heightMobile,
      }],
      minify: true,
      extract: false,
      inline: true,
    },
    optimize: {
      cwd: project.build.dir,
      src: ['*.html'],
      dest: project.build.dir,
      expand: true,
    },
  };
};
