/* global Promise */

import FontFaceObserver from 'fontfaceobserver';

const LOADED_PREFIX = 'font-';
const LOADED_SUFFIX = '-is-loaded';

function generateFontClassName(fontName) {
  const noSpaces = fontName.replace(/\s/gu, '');
  return `${LOADED_PREFIX}${noSpaces}${LOADED_SUFFIX}`;
}

function loadFont(font) {
  const fontLoading = new FontFaceObserver(font);
  return fontLoading
    .load()
    .then((loadedFont) => {
      document.body.classList.add(generateFontClassName(loadedFont.family));
      return Promise.resolve();
    });
}

function loadFonts(fonts) {
  return fonts ? Promise.all(fonts.map(loadFont)) : Promise.resolve();
}

export default function load(fontCritical, fontsRest) {
  return loadFont(fontCritical).then(() => loadFonts(fontsRest));
}
