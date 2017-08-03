/* eslint max-len: "off" */
/* eslint no-param-reassign: "off" */

const tasks = {
  options: {
    prefix: 'spt-',
    svg: {
      class: 'sourceSVG',
    },
    formatting: {
      indent_size: 2,
    },
    includeTitleElement: false,
    preserveDescElement: false,
    cleanup: true,
    cleanupdefs: true,
  },
};

function generateTask(project, helpers, name, ext, directoryPath, spritePath) {
  tasks[`${name}`] = {
    src: `${directoryPath}*.${ext}`,
    dest: `${spritePath}_${name}.${ext}`,
  };
}

function getSprite(grunt, project, helpers, sprite, spritePath) {
  const [name, ext] = sprite.split('.');
  if (helpers.imageVectorFiles.indexOf(ext) !== -1) {
    const directoryPath = `${project.res.images.sources}${name}/`;
    if (grunt.file.exists(directoryPath)) {
      generateTask(project, helpers, name, ext, directoryPath, spritePath);
    }
  }
}

function generateTasks(grunt, project, helpers) {
  const spritePath = project.res.templates.comp;
  project.res.images.sprites.forEach((sprite) => {
    getSprite(grunt, project, helpers, sprite, spritePath);
  });
  return tasks;
}

module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return generateTasks(grunt, project, helpers);
};
