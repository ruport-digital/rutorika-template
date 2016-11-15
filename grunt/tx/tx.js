'use strict';

function inlineModernizr(grunt, modernizr, filePath, fileRoot, sub, fileName) {
  var filenameArray = fileName.split('.');
  if (filenameArray[(filenameArray.length - 1)] === 'html') {
    let file = (grunt.file.read(filePath)).replace(/(?:\s|\t)*.*src=".*Modernizr\/.*(?=\r?\n|\r)/gm, modernizr);
    grunt.file.write(filePath, file);
  }
}

function criticalModernizr(grunt, project) {
  var html = grunt.file.read(`${project.build.dir}${project.index}`);
  var modernizrPath = (`${project.build.dir}${html.match(/src=".*Modernizr\/.*?"/gm)}`).replace(/"|'|src=/gm, '');
  var modernizr = (`\n    <script id="modernizr" type="text/javascript">${grunt.file.read(modernizrPath)}</script>`).replace(/\/\*(?:\r?\n|\r|.)*\*\/(?:\r?\n|\r)/gm, '');
  grunt.file.recurse(project.build.dir, (filePath, fileRoot, sub, fileName) => inlineModernizr(grunt, modernizr, filePath, fileRoot, sub, fileName));
}

function dataURIPlaceholder(grunt, project, file) {
  var scssIE = '';
  if (grunt.file.isFile(`${project.res.images.dir}${file}`)) {
    scssIE += `%ie-image-${file.split('.')[0]} {\n  background-image: url(${project.res.images.dir.replace(project.res.dir, '../')}${file});\n}\n\n`;
  }
  return scssIE;
}

function dataURIFallback(grunt, project, helpers) {
  var scssIE = '';
  project.res.images.dataURI.forEach(file => scssIE += dataURIPlaceholder(grunt, project, file));
  if (scssIE !== '') {
    grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURIFallback}`, scssIE);
  }
}

function dataURICleanup(grunt, project, helpers) {
  var scss = grunt.file.read(`${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`).replace(/"/gm, '').replace(/\t/gm, '  ').replace(/\n\n$/gm, '\n');
  grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`, scss);
}

function placeholderSpriteCSS(name, ext, densitySuffix, density) {
  if (density !== 1) {
    return `@mixin ssh-${name}${densitySuffix.replace('@', '-')} {\n\n  %ssh-${name} {\n    background-image: url(nth($ssh-${name}${densitySuffix.replace('@', '-')}, 3));\n    background-size: #{nth($ssh-${name}, 1)} #{nth($ssh-${name}, 2)};\n  }\n\n}`;
  } else {
    return `@mixin ssh-${name} {\n\n  %ssh-${name} {\n    background-image: url(nth($ssh-${name}, 3));\n  }\n\n}`;
  }
}

function eachDensitySpriteSCSS(grunt, scssPath, name, ext, density) {
  var scss = '';
  var densitySuffix = density === 1 ? '' : `@${density}x`;
  var file = `${scssPath}${densitySuffix}.scss`;
  if (grunt.file.isFile(file)) {
    let block = grunt.file.read(file).replace(/(?:\r?\n|\r){2,}/gm, '');
    let placeholder = placeholderSpriteCSS(name, ext, densitySuffix, density);
    block = `// ${name}${densitySuffix}.${ext}\n\n${block}\n\n${placeholder}\n\n\n\n`;
    scss += block;
    grunt.file.delete(file);
  }
  return scss;
}

function spriteSCSS(grunt, project, helpers, sprite) {
  var scss = '';
  var fullName = sprite.split('.');
  var name = fullName[0];
  var ext = fullName[1];
  var scssPath = `${project.res.css.sass}${helpers.scss}${helpers.temp}_${name}`;
  project.res.images.desities.forEach(density => scss += eachDensitySpriteSCSS(grunt, scssPath, name, ext, density));
  return scss;
}

function eachSpriteSCSS(grunt, project, helpers) {
  var scss = '';
  project.res.images.sprites.forEach(sprite => scss += spriteSCSS(grunt, project, helpers, sprite));
  return scss;
}

function spritesSCSS(grunt, project, helpers) {
  if (project.res.images.sprites.length > 0) {
    let scss = eachSpriteSCSS(grunt, project, helpers);
    grunt.file.delete(`${project.res.css.sass}${helpers.scss}${helpers.spritesSCSS}`);
    scss = scss.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\/(?:\r?\n|\r)/gm, '').replace(/\, \)/gm, ')').replace(/(\s|\()0px/gm, '$1' + '0');
    scss = scss.replace(/\n\n\n\n$/gm, '\n');
    grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.spritesSCSS}`, scss);
  }
}

function conditionalTask(grunt, project, condition, tasks, task, index) {
  if (condition) {
    tasks.splice(index, 0, task);
  }
  grunt.task.run(tasks);
}

exports.criticalModernizr = criticalModernizr;
exports.dataURIFallback = dataURIFallback;
exports.dataURICleanup = dataURICleanup;
exports.spritesSCSS = spritesSCSS;
exports.conditionalTask = conditionalTask;
