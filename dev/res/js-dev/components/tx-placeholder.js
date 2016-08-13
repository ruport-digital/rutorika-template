/* jshint browser:true */

'use strict';

var eventTool = require('./tx-event');

const ACTIVE_CLASS_NAME = 'js-field-is-showingPlaceholder';

function fieldPlaceholder(node) {

  var field;

  /* Actions */

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

  /* Interactions */

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

  /* Initialization */

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

  /* Interface */

  return {
    destroy: destroy
  };

}

function init() {
  var fields = document.querySelectorAll('input, textarea');
  fields.forEach(fieldPlaceholder);
}

function destroy(fields) {
  fields.forEach(field => field.destroy());
}

exports.init = init;
exports.destroy = destroy;
