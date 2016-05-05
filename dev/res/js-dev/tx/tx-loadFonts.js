/* jshint browser:true */
/* global Promise */

'use strict';

var FontFaceObserver = require('fontfaceobserver');

module.exports = (fontCritical, fontsRest, className, object) => {
  var critical = new FontFaceObserver(fontCritical);
  critical.check().then(_ => {
    var restChecks = [];
    object.className += ` ${className}Critical-is-loaded`;
    for (let index, length = fontsRest.length; index < length; index += 1) {
      restChecks.push((new FontFaceObserver(fontsRest[index])).check());
    }
    Promise.all(restChecks).then(_ => {
      object.className += ` ${className}Rest-is-loaded`;
    });
  });
};
