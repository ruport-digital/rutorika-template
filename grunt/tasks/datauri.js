module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  function generateTasks() {
    var tasks = {
      src: [],
      dest: `${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURI}`
    };
    project.res.images.dataURI.forEach(image => tasks.src.push(`${project.res.images.dir}${image}`));
    return tasks;
  }

  return {
    options: {
      classPrefix: 'image-'
    },
    images: generateTasks()
  };

};
