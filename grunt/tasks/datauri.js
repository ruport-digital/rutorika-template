module.exports = (grunt, options) => {
  const { project, helpers } = options;

  function generateTasks() {
    const tasks = {
      src: [],
      dest: `${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURI}`,
    };
    project.res.images.dataURI.forEach(image => tasks.src.push(`${project.res.images.dir}${image}`));
    return tasks;
  }

  return {
    options: {
      classPrefix: 'image-',
    },
    images: generateTasks(),
  };
};
