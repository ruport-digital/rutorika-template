/* global grunt */

function generateTask(project, helpers, tasks, name, ext, density, densitySuffix, directoryPath, spritePath, imgPath) {
  tasks[`${name}${densitySuffix}`] = {
    src: `${directoryPath}*.${ext}`,
    dest: `${spritePath}${name}${densitySuffix}.${ext}`,
    destCss: `${project.res.css.sass}${helpers.scss}${helpers.temp}_${name}${densitySuffix}.scss`,
    imgPath: `${imgPath}${name}${densitySuffix}.${ext}`,
    padding: 5 * density,
    cssSpritesheetName: `ssh-${name}${densitySuffix.replace('@', '-')}`,
    cssVarMap(item) {
      item.name = `spt-${item.name}`;
    },
    cssOpts: {
      functions: false,
      variableNameTransforms: []
    }
  };
}

function getDensity(project, helpers, tasks, name, ext, density, spritePath, imgPath) {
  var densitySuffix = density === 1 ? '' : `@${density}x`;
  var directoryPath = `${spritePath}${name}${densitySuffix}/`;
  if (grunt.file.exists(directoryPath)) {
    generateTask(tasks, name, ext, density, densitySuffix, directoryPath, spritePath, imgPath);
  }
}

function getSprite(project, helpers, sprite, tasks, spritePath, imgPath) {
  var name = sprite.split('.')[0];
  var ext = sprite.split('.')[1];
  project.res.images.desities.forEach(density => getDensity(tasks, name, ext, density, spritePath, imgPath));
}

function generateTasks(project, helpers) {
  var tasks = {};
  var spritePath = project.res.images.dir;
  var imgPath = `../${spritePath.replace(project.res.dir, '')}`;
  project.res.images.sprites.forEach(sprite => getSprite(project, helpers, sprite, tasks, spritePath, imgPath));
  return tasks;
}

module.exports = (grunt, options) => {

  var project = options.project;
  var helpers = options.helpers;

  return generateTasks(project, helpers);

};
