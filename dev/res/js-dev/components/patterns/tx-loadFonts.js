const FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');

const LOADED_PREFIX = 'font-';
const LOADED_SUFFIX = '-is-loaded';

function getFontClassName(fontName) {
  const noSpaces = fontName.replace(/ /g, '');
  return `${LOADED_PREFIX}${noSpaces}${LOADED_SUFFIX}`;
}

function fontPromise(font) {
  const rest = new FontFaceObserver(font);
  rest
    .load()
    .then((loadedFont) => {
      document.body.classList.add(getFontClassName(loadedFont.family));
    });
}

module.exports = (fontCritical, fontsRest) => {
  const critical = new FontFaceObserver(fontCritical);
  critical
    .load()
    .then((loadedFont) => {
      document.body.classList.add(getFontClassName(loadedFont.family));
      if (fontsRest) {
        fontsRest.forEach(fontPromise);
      }
    });
};
