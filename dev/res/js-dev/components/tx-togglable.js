/* jshint browser:true */

'use strict';

var eventTools = require('./tx-event');

module.exports = (element, callback) => {

  var object;
  var task;
  var active;
  var activeClassName;

  function toggle(event) {
    if (event) {
      event.preventDefault();
    }
    if (active) {
      object.className = object.className.replace(activeClassName, '');
    } else {
      object.className += ` ${activeClassName}`;
    }
    if (task) {
      task();
    }
    active = !active;
  }

  if (element) {
    object = element;
    task = callback;
    active = false;
    activeClassName = `${object.className.split(' ')[0]}-is-active`;
    eventTools.bind(object, 'click', toggle);
  } else {
    return false;
  }

  return {
    toggle: toggle
  };

};
