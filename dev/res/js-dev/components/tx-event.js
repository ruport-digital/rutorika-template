/* jshint browser:true */

function bind(object, type, callback) {
  if (document.addEventListener) {
    object.addEventListener(type, callback);
  } else {
    object.attachEvent(type, callback);
  }
}

exports.bind = bind;
