/* jshint browser:true */
/* global Promise */

'use strict';

var FontFaceObserver = require('fontfaceobserver');

module.exports = (fontCritical, fontsRest, className, object) => {
  var critical = new FontFaceObserver(fontCritical);
  critical.check().then(_ => {
    object.classList.add(`${className}Critical-is-loaded`);
    let restChecks = fontsRest.map(font => restChecks.push((new FontFaceObserver(font)).check()));
    Promise.all(restChecks).then(_ => object.classList.add(`${className}Rest-is-loaded`));
  });
};
