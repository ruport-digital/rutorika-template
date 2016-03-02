/* jshint browser:true */

'use strict';

var addEvent = require('./tx-event');

function Hamburger(element) {

  var object;
  var activeClassName;

  function toggle(event) {
    var currentClassName = object.className;
    if (event) {
      event.preventDefault();
    }
    object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : `${currentClassName} ${activeClassName}`;
  }

  function setup() {
    if (element) {
      object = element;
      activeClassName = `${object.className.split(' ')[0]}-is-active`;
      addEvent.bind(object, 'click', toggle);
    }
  }

  setup();

  return {
    toggle: toggle
  };

}

function init(element) {
  return new Hamburger(element);
}

exports.init = init;
