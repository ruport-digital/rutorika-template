/* eslint max-lines-per-function: 'off' */

import * as eventManager from 'patterns/tx-eventManager';

const ACTIVE_CLASS_NAME_SUFFIX = '-is-active';

export default function togglable(node, callback) {
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
    eventManager.bind(trigger, 'click', onClick);
  }

  function removeInteractions() {
    eventManager.unbind(trigger, 'click', onClick);
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
}
