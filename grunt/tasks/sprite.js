/* eslint max-len: "off" */
/* eslint no-param-reassign: "off" */

const tasks = {};

function generateTask(project, helpers, name, ext, density, densitySuffix, directoryPath, spritePath, imgPath) {
  tasks[`${name}${densitySuffix}`] = {
    src: `${directoryPath}*.${ext}`,
    dest: `${spritePath}${name}${densitySuffix}.${ext}`,
    destCss: `${project.res.css.sass}${helpers.scss}${helpers.temp}_${name}${densitySuffix}.scss`,
    imgPath: `${imgPath}${name}${densitySuffix}.${ext}`,
    padding: 5 * density,
    cssSpritesheetName: `ssh-${name}${densitySuffix.replace('@', '-')}`,
    algorithmOpts: {
      sort: false,
    },
    cssVarMap(item) {
      item.name = `spt-${item.name}`;
    },
    cssOpts: {
      functions: false,
      variableNameTransforms: [],
    },
  };
}

function getDensity(grunt, project, helpers, name, ext, density, spritePath, imgPath) {
  const densitySuffix = density === 1 ? '' : `@${density}x`;
  const directoryPath = `${project.res.images.sources}${name}${densitySuffix}/`;
  if (grunt.file.exists(directoryPath)) {
    generateTask(project, helpers, name, ext, density, densitySuffix, directoryPath, spritePath, imgPath);
  }
}

function getSprite(grunt, project, helpers, sprite, spritePath, imgPath) {
  const [name, ext] = sprite.split('.');
  if (helpers.imageRasterFiles.indexOf(ext) !== -1) {
    project.res.images.densities.forEach((density) => {
      getDensity(grunt, project, helpers, name, ext, density, spritePath, imgPath);
    });
  }
}

function generateTasks(grunt, project, helpers) {
  const spritePath = project.res.images.dir;
  const imgPath = `../${spritePath.replace(project.res.dir, '')}`;
  project.res.images.sprites.forEach((sprite) => {
    getSprite(grunt, project, helpers, sprite, spritePath, imgPath);
  });
  return tasks;
}

module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return generateTasks(grunt, project, helpers);
};
