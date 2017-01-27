/* jshint browser:true */

const eventTool = require('./tx-event.js');
const togglable = require('./tx-togglable.js');

const EVENT = 'tabswitch';
const ACTIVE_CLASS_NAME_SUFFIX = '-is-active';
const CONTENT_CLASS_NAME = 'tabContent';
const CONTENT_ACTIVE_CLASS_NAME = `${CONTENT_CLASS_NAME}${ACTIVE_CLASS_NAME_SUFFIX}`;

module.exports = (element, holder) => {
  let tab;
  let content;
  let catcher;
  let active;

  /* Utilities */

  function getId() {
    return tab.getAttribute('href').replace('#', '');
  }

  /* Actions */

  function activate() {
    if (!active) {
      eventTool.trigger(catcher, EVENT, false, 'UIEvent');
      active = true;
      content.classList.add(CONTENT_ACTIVE_CLASS_NAME);
    }
  }

  function deactivate() {
    if (active) {
      active = false;
      content.classList.remove(CONTENT_ACTIVE_CLASS_NAME);
    }
  }

  function status() {
    return active;
  }

  /* Initialization */

  function init() {
    tab = togglable(element, activate);
    content = document.getElementById(getId());
    catcher = holder;
    active = false;
  }

  function destroy() {
    tab = null;
    content = null;
    catcher = null;
    active = null;
  }

  init();

  /* Interface */

  return {
    destroy,
    activate,
    deactivate,
    status,
  };
};
