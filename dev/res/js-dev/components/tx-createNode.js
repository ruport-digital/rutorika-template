/* jshint browser:true */

'use strict';

module.exports = html => {
  var element = document.createElement('div');
  element.innerHTML = html;
  return element.firstChild;
};
