/* jshint browser:true */

var addEvent = require('./tx-event');

var object;
var activeClassName;

function toggle(event) {
  var currentClassName = object.className;
  event.preventDefault();
  object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : currentClassName + activeClassName;
}

function clicked(event) {
  var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
  if (target.className.indexOf(activeClassName) > -1) {
    toggle(event);
  }
}

function init(node) {
  if (node) {
    object = node;
    activeClassName = ' ' + object.className + '-is-active';
    addEvent.bind(object, 'click', clicked);
  }
}

exports.init = init;
exports.toggle = toggle;
