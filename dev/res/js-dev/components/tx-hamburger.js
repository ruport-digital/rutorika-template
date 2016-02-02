/* jshint browser:true */

var addEvent = require('./tx-event');

var object;
var activeClassName;

function toggle(event) {
  var currentClassName = object.className;
  event.preventDefault();
  object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : currentClassName + activeClassName;
}

function init(node) {
  if (node) {
    object = node;
    activeClassName = ' ' + object.className + '-is-active';
    addEvent.bind(object, 'click', toggle);
  }
}

exports.init = init;
