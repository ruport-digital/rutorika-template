/* jshint browser:true */
/* global Promise */

var FontFaceObserver = require('fontfaceobserver');

function load(fontCritical, fontClass, fonts, object) {
  var critical = new FontFaceObserver(fontCritical);
  critical.check().then(function () {
    var index = 0;
    var length = fonts.length;
    var restChecks = [];
    object.className += ' ' + fontClass + 'Critical-is-loaded';
    for (index; index < length; index += 1) {
      restChecks.push((new FontFaceObserver(fonts[index])).check());
    }
    Promise.all(restChecks).then(function () {
      object.className += ' ' + fontClass + 'Rest-is-loaded';
    });
  });
}

exports.bind = load;
