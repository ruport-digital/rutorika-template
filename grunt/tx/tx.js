/* eslint no-useless-concat: "off" */

function inlineModernizr(grunt, modernizr, filePath, fileRoot, sub, fileName) {
  const filenameArray = fileName.split('.');
  if (filenameArray[(filenameArray.length - 1)] === 'html') {
    const file = (grunt.file.read(filePath)).replace(/(?:\s|\t)*.*src=".*Modernizr\/.*(?=\r?\n|\r)/ugm, modernizr);
    grunt.file.write(filePath, file);
  }
}

function criticalModernizr(grunt, project) {
  const html = grunt.file.read(`${project.build.dir}${project.index}`);
  const modernizrPath = (`${project.build.dir}${html.match(/src=".*Modernizr\/.*?"/ugm)}`).replace(/"|'|src=/ugm, '');
  const modernizr = (`\n    <script id="modernizr" type="text/javascript">${grunt.file.read(modernizrPath)}</script>`).replace(/\/\*(?:\r?\n|\r|.)*\*\/(?:\r?\n|\r)/ugm, '');
  grunt.file.recurse(project.build.dir, (filePath, fileRoot, sub, fileName) => {
    inlineModernizr(grunt, modernizr, filePath, fileRoot, sub, fileName);
  });
}

function dataURIPlaceholder(grunt, project, file) {
  let scssIE = '';
  if (grunt.file.isFile(`${project.res.images.dir}${file}`)) {
    scssIE += `%ie-image-${file.split('.')[0]} {\n  background-image: url('${project.res.images.dir.replace(project.res.dir, '../')}${file}');\n}\n\n`;
  }
  return scssIE;
}

function dataURIFallback(grunt, project, helpers) {
  let scssIE = '';
  project.res.images.dataURI.forEach((file) => {
    scssIE += dataURIPlaceholder(grunt, project, file);
  });
  if (scssIE !== '') {
    grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.temp}${helpers.dataURIFallback}`, scssIE);
  }
}

function dataURICleanup(grunt, project, helpers) {
  const scss = grunt.file.read(`${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`).replace(/"/ugm, '\'').replace(/\t/ugm, '  ').replace(/\n\n$/ugm, '\n');
  grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.dataURISCSS}`, scss);
}

function placeholderSpriteCSS(name, ext, densitySuffix, density) {
  if (density !== 1) {
    const mixinRegular = `@mixin ssh-${name}${densitySuffix.replace('@', '-')} {\n\n  %ssh-${name} {\n    background-image: url(nth($ssh-${name}${densitySuffix.replace('@', '-')}, 3));\n    background-size: #{nth($ssh-${name}, 1)} #{nth($ssh-${name}, 2)};\n  }\n\n}`;
    const mixinRelative = `@mixin ssh-${name}${densitySuffix.replace('@', '-')}-rel {\n\n  %ssh-${name} {\n    background-image: url(nth($ssh-${name}${densitySuffix.replace('@', '-')}, 3));\n }\n\n}`;
    return `${mixinRegular}\n\n${mixinRelative}`;
  }
  return `@mixin ssh-${name} {\n\n  %ssh-${name} {\n    background-image: url(nth($ssh-${name}, 3));\n  }\n\n}`;
}

function eachDensitySpriteSCSS(grunt, scssPath, name, ext, density) {
  let scss = '';
  const densitySuffix = density === 1 ? '' : `@${density}x`;
  const file = `${scssPath}${densitySuffix}.scss`;
  if (grunt.file.isFile(file)) {
    let block = grunt.file.read(file).replace(/\/\/.*(?:\r?\n|\r)|(?:\r?\n|\r){2,}/ugm, '');
    const placeholder = placeholderSpriteCSS(name, ext, densitySuffix, density);
    block = `// ${name}${densitySuffix}.${ext}\n\n${block}\n\n${placeholder}\n\n\n\n`;
    scss += block;
    grunt.file.delete(file);
  }
  return scss;
}

function spriteSCSS(grunt, project, helpers, sprite) {
  let scss = '';
  const fullName = sprite.split('.');
  const [name, ext] = fullName;
  const scssPath = `${project.res.css.sass}${helpers.scss}${helpers.temp}_${name}`;
  project.res.images.densities.forEach((density) => {
    scss += eachDensitySpriteSCSS(grunt, scssPath, name, ext, density);
  });
  return scss;
}

function eachSpriteSCSS(grunt, project, helpers) {
  let scss = '';
  project.res.images.sprites.forEach((sprite) => {
    scss += spriteSCSS(grunt, project, helpers, sprite);
  });
  return scss;
}

function spritesSCSS(grunt, project, helpers) {
  const sprites = project.res.images.sprites.filter(value => value.split('.').pop() !== 'svg');
  if (sprites.length > 0) {
    let scss = eachSpriteSCSS(grunt, project, helpers);
    grunt.file.delete(`${project.res.css.sass}${helpers.scss}${helpers.spritesSCSS}`);
    scss = scss.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\/(?:\r?\n|\r)/ugm, '').replace(/, \)/ugm, ')').replace(/(\s|\()0px/ugm, '$1' + '0');
    scss = scss.replace(/\n\n\n\n$/ugm, '\n');
    grunt.file.write(`${project.res.css.sass}${helpers.scss}${helpers.spritesSCSS}`, scss);
  }
}

function processSprites(grunt, project, helpers) {
  const spritesTasks = [];
  const rasterSprites = project.res.images.sprites.filter(value => value.split('.').pop() !== helpers.imageVectorFiles);
  if (rasterSprites.length > 0) {
    spritesTasks.push('process-raster-sprites');
  }
  const vectorSprites = project.res.images.sprites.filter(value => value.split('.').pop() === helpers.imageVectorFiles);
  if (vectorSprites.length > 0) {
    spritesTasks.push('process-vector-sprites');
  }
  if (spritesTasks.length > 0) {
    spritesTasks.push('process-sprite-images');
  }
  return spritesTasks;
}

function generatePages(grunt, project, helpers) {
  const files = grunt.file.expand({ cwd: project.dir }, '*.html');
  if (files.length > 0) {
    const links = files.map(file => `<a href="/${file}">${file}</a>`).join('<br><br>');
    const html = `<!DOCTYPE html><html><body><pre>${links}</pre></body></html>`;
    grunt.file.write(`${project.dir}${helpers.pages}`, html);
  }
}

exports.criticalModernizr = criticalModernizr;
exports.dataURIFallback = dataURIFallback;
exports.dataURICleanup = dataURICleanup;
exports.spritesSCSS = spritesSCSS;
exports.processSprites = processSprites;
exports.generatePages = generatePages;
