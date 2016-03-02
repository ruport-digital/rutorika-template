/* jshint browser:true */

'use strict';

var addEvent = require('./tx-event');

function Overlay(element) {

  var object;
  var activeClassName;

  function toggle(event) {
    var currentClassName = object.className;
    if (event) {
      event.preventDefault();
    }
    object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : `${currentClassName} ${activeClassName}`;
  }

  function clicked(event) {
    var target = (event.target) ? event.target : event.srcElement;
    if (target.className.indexOf(activeClassName) > -1) {
      toggle(event);
    }
  }

  function setup() {
    if (element) {
      object = element;
      activeClassName = `${object.className.split(' ')[0]}-is-active`;
      addEvent.bind(object, 'click', clicked);
    }
  }

  setup();

  return {
    toggle: toggle
  };

}

function init(element) {
  return new Overlay(element);
}

exports.init = init;
