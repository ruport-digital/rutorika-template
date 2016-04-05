module.exports = (grunt, options) => {

  var project = options.project;

  return {
    options: {
      noJunk: true
    },
    build: {
      src: [`${project.build.dir}**/*`]
    }
  };

};
