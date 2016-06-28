/* jshint browser:true */
/* global Promise */

'use strict';

var FontFaceObserver = require('fontfaceobserver');

module.exports = (fontCritical, fontsRest, className, object) => {
  var critical = new FontFaceObserver(fontCritical);
  critical.check().then(_ => {
    var restChecks = [];
    object.classList.add(`${className}Critical-is-loaded`);
    for (let index, length = fontsRest.length; index < length; index += 1) {
      restChecks.push((new FontFaceObserver(fontsRest[index])).check());
    }
    Promise.all(restChecks).then(_ => {
      object.classList.add(`${className}Rest-is-loaded`);
    });
  });
};
