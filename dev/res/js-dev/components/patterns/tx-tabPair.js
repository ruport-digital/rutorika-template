/* jshint browser:true */

'use strict';

const EVENT = 'tabswitch';
const ACTIVE_CLASS_NAME_SUFFIX = '-is-active';
const TAB_CLASS_NAME = 'tab';
const TAB_ACTIVE_CLASS_NAME = `${TAB_CLASS_NAME}${ACTIVE_CLASS_NAME_SUFFIX}`;
const CONTENT_CLASS_NAME = 'tabContent';
const CONTENT_ACTIVE_CLASS_NAME = `${CONTENT_CLASS_NAME}${ACTIVE_CLASS_NAME_SUFFIX}`;

var eventTool = require('./tx-event.js');

module.exports = (element, holder) => {

  var tab;
  var content;
  var catcher;
  var active;

  /* Utilities */

  function getId() {
    return tab.getAttribute('href').replace('#', '');
  }

  /* Actions */

  function activate() {
    if (!active) {
      eventTool.trigger(catcher, EVENT, false, 'UIEvent');
      active = true;
      tab.classList.add(TAB_ACTIVE_CLASS_NAME);
      content.classList.add(CONTENT_ACTIVE_CLASS_NAME);
    }
  }

  function deactivate() {
    if (active) {
      active = false;
      tab.classList.remove(TAB_ACTIVE_CLASS_NAME);
      content.classList.remove(CONTENT_ACTIVE_CLASS_NAME);
    }
  }

  function status() {
    return active;
  }

  /* Interactions */

  function onClick(event) {
    event.preventDefault();
    activate();
  }

  function initInteractions() {
    eventTool.bind(tab, 'click', onClick);
  }

  function removeInteractions() {
    eventTool.unbind(tab, 'click', onClick);
  }

  /* Initialization */

  function defaultValues() {
    tab = element;
    content = document.getElementById(getId());
    catcher = holder;
    active = false;
  }

  function init() {
    defaultValues();
    initInteractions();
  }

  function removeValues() {
    element = null;
    holder = null;
    tab = null;
    content = null;
    catcher = null;
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
    status: status
  };

};
