const eventTool = require('./tx-event');

const ACTIVE_CLASS_NAME_SUFFIX = '-is-active';

module.exports = (node, callback) => {
  let trigger;
  let task;
  let activeClassName;
  let active;

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

  function toggle() {
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
    eventTool.bind(trigger, 'click', onClick);
  }

  function removeInteractions() {
    eventTool.unbind(trigger, 'click', onClick);
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
    destroy,
    activate,
    deactivate,
    toggle,
  };
};
