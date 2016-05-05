/* jshint browser:true */

'use strict';

module.exports = (element, callback) => {

  var eventTools = require('./tx-event');
  var trigger = require('./tx-toggle');

  var object;
  var task;
  var active;
  var activeClassName;

  function toggle(event) {
    if (event) {
      event.preventDefault();
    }
    trigger.toggle(object, activeClassName, active);
    if (typeof task === 'function') {
      task();
    }
    active = !active;
  }

  if (element) {
    object = element;
    task = callback;
    active = false;
    activeClassName = `${object.className.split(' ').shift()}-is-active`;
    eventTools.bind(object, 'click', toggle);
  } else {
    return false;
  }

  return {
    toggle: toggle
  };

};
