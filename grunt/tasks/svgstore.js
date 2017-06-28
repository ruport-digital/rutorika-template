/* eslint max-len: "off" */
/* eslint no-param-reassign: "off" */

const tasks = {
  options: {
    prefix: 'spt-',
  },
};

function generateTask(project, helpers, name, ext, directoryPath, spritePath) {
  tasks[`${name}`] = {
    src: `${directoryPath}*.${ext}`,
    dest: `${spritePath}${name}.${ext}`,
  };
}

function getSprite(grunt, project, helpers, sprite, spritePath) {
  const [name, ext] = sprite.split('.');
  const directoryPath = `${project.res.images.sources}${name}/`;
  if (grunt.file.exists(directoryPath)) {
    generateTask(project, helpers, name, ext, directoryPath, spritePath);
  }
}

function generateTasks(grunt, project, helpers) {
  const spritePath = project.res.images.dir;
  project.res.images.sprites.forEach((sprite) => {
    getSprite(grunt, project, helpers, sprite, spritePath);
  });
  return tasks;
}

module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return generateTasks(grunt, project, helpers);
};
