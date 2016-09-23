/* jshint browser:true */

'use strict';

var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');

const LOADED_SUFFIX = '-is-loaded';

function getFontClassName(fontName) {
  var firstCharacter = fontName.charAt(0).toLowerCase();
  var noSpaces = fontName.replace(/ /g, '');
  return `${firstCharacter}${noSpaces.slice(1, noSpaces.length)}${LOADED_SUFFIX}`;
}

function fontPromise(font) {
  var rest = new FontFaceObserver(font);
  rest
    .load()
    .then(loadedFont => {
      document.body.classList.add(getFontClassName(loadedFont.family));
  });
}

module.exports = (fontCritical, fontsRest) => {
  var critical = new FontFaceObserver(fontCritical);
  critical
    .load()
    .then(loadedFont => {
      document.body.classList.add(getFontClassName(loadedFont.family));
      if (fontsRest) {
        fontsRest.forEach(fontPromise);
      }
  });
};
