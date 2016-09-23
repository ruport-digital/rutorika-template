/* jshint browser:true */

'use strict';

var eventTool = require('./tx-event');

const ACTIVE_CLASS_NAME = 'js-field-is-showingPlaceholder';

/* Placeholder Constructor */

function fieldPlaceholder(node) {

  var field;

  /* Field Actions */

  function addPlaceholder(field) {
    if (field.value === '') {
      field.classList.add(ACTIVE_CLASS_NAME);
      field.value = field.getAttribute('placeholder');
    }
  }

  function removePlaceholder(field) {
    if (field.value === field.getAttribute('placeholder')) {
      field.classList.remove(ACTIVE_CLASS_NAME);
      field.value = '';
    }
  }

  /* Field Interactions */

  function onFocus(event) {
    removePlaceholder(eventTool.target(event));
  }

  function onBlur(event) {
    addPlaceholder(eventTool.target(event));
  }

  function initInteractions() {
    eventTool.bind(field, 'focus', onFocus);
    eventTool.bind(field, 'blur', onBlur);
  }

  function removeInteractions() {
    eventTool.unbind(field, 'focus', onFocus);
    eventTool.unbind(field, 'blur', onBlur);
  }

  /* Field Initialization */

  function initValues() {
    field = node;
  }

  function initPlaceholder() {
    initValues();
    initInteractions();
    addPlaceholder(field);
  }

  function removeValues() {
    field = null;
  }

  function destroy() {
    removeInteractions();
    removeValues();
  }

  initPlaceholder();

  /* Filed Interface */

  return {
    destroy: destroy
  };

}

/* Inititalization */

function init() {
  var fields = document.querySelectorAll('input, textarea');
  fields.forEach(fieldPlaceholder);
}

function destroy(fields) {
  fields.forEach(field => field.destroy());
}

/* Interface */

exports.init = init;
exports.destroy = destroy;
