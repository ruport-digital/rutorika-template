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
  grunt.file.recurse(project.build.dir, (filePath, fileRoot, sub, fileName) => {inlineModernizr(grunt, modernizr, filePath, fileRoot, sub, fileName);});
}

function dataURIPlaceholder(scssIE, grunt, project, file) {
  if (grunt.file.isFile(`${project.res.images.dir}${file}`)) {
    scssIE += `%ie-image-${file.split('.')[0]} {\n  background-image: url(${project.res.images.dir.replace(project.res.dir, '../')}${file});\n}\n\n`;
  }
}

function dataURIFallback(grunt, project, helpers) {
  var scssIE = '';
  project.res.images.dataURI.forEach(file => {dataURIPlaceholder(scssIE, grunt, project, file);});
  if (scssIE !== '') {
    grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURIFallback}`, scssIE);
  }
}

function dataURICleanup(grunt, project, helpers) {
  var scss = grunt.file.read(`${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`).replace(/"/gm, '').replace(/\t/gm, '  ').replace(/\n\n$/gm, '\n');
  grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`, scss);
}

function spriteSCSS(grunt, project, helpers, scss, sprite) {
  var fullName = sprite.split('.');
  var name = fullName[0];
  var ext = fullName[1];
  var scssPath = `${project.res.css.sass}${helpers.scss}${helpers.temp}_${name}`;
  project.res.images.desities.forEach(density => {
    var densitySuffix = density === 1 ? '' : `@${density}x`;
    var scssFile = `${scssPath}${densitySuffix}.scss`;
    if (grunt.file.isFile(scssFile)) {
      let scssBlock = grunt.file.read(scssFile).replace(/(?:\r?\n|\r){2,}/gm, '');
      scssBlock = `// ${name}${densitySuffix}.${ext}\n\n${scssBlock}\n\n\n\n`;
      scss += scssBlock;
      grunt.file.delete(scssFile);
    }
  });
}

function spritesSCSS(grunt, project, helpers) {
  if (project.res.images.sprites.length > 0) {
    var scss = '';
    grunt.file.delete(`${project.res.css.sass}${helpers.scss}${helpers.spritesSCSS}`);
    project.res.images.sprites.forEach(sprite => {spriteSCSS(grunt, project, helpers, scss, sprite);});
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
