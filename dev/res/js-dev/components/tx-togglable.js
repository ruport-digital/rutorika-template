/* jshint browser:true */

'use strict';

var eventTools = require('./tx-event');

const ACTIVE_CLASS_NAME_SUFFIX = '-is-active';

module.exports = (node, callback) => {

  var trigger;
  var task;
  var activeClassName;
  var active;

  /* Actions */

  function runTask() {
    if (typeof task === 'function') {
      task();
    }
  }

  function activate() {
    if (!active) {
      active = true;
      trigger.classList.add(activeClassName);
      runTask();
    }
  }

  function deactivate() {
    if (active) {
      active = false;
      trigger.classList.remove(activeClassName);
      runTask();
    }
  }

  function toggle(event) {
    if (active) {
      deactivate();
    } else {
      activate();
    }
  }

  /* Interactions */

  function onClick(event) {
    event.preventDefault();
    toggle();
  }

  function initInteractions() {
    eventTools.bind(trigger, 'click', onClick);
  }

  function removeInteractions() {
    eventTools.unbind(trigger, 'click', onClick);
  }

  /* Initialization */

  function initValues() {
    trigger = node;
    task = callback;
    activeClassName = `${trigger.classList.item(0)}${ACTIVE_CLASS_NAME_SUFFIX}`;
    active = false;
  }

  function init() {
    initValues();
    initInteractions();
  }

  function removeValues() {
    trigger = null;
    task = null;
    activeClassName = null;
    active = null;
  }

  function destroy() {
    removeInteractions();
    removeValues();
  }

  init();

  /* Interface */

  return {
    destroy: destroy,
    activate: activate,
    deactivate: deactivate,
    toggle: toggle
  };

};
