/* jshint browser:true */
/* global Promise */

'use strict';

var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');

const CRITICAL_SUFFIX = 'Critical';
const REST_SUFFIX = 'Rest';
const LOADED_SUFFIX = '-is-loaded';

module.exports = (fontCritical, fontsRest, className, object) => {
  var critical = new FontFaceObserver(fontCritical);
  critical.load().then(_ => {
    object.classList.add(`${className}${CRITICAL_SUFFIX}${LOADED_SUFFIX}`);
    let restChecks = fontsRest.map(font => restChecks.push((new FontFaceObserver(font)).load()));
    Promise.all(restChecks).then(_ => object.classList.add(`${className}${REST_SUFFIX}${LOADED_SUFFIX}`));
  });
};
