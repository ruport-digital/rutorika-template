/* jshint browser:true */

const eventTool = require('./tx-event');

const ACTIVE_CLASS_NAME = 'js-field-is-showingPlaceholder';

/* Placeholder Constructor */

function fieldPlaceholder(node) {
  let field;

  /* Field Actions */

  function addPlaceholder() {
    if (field.value === '') {
      field.classList.add(ACTIVE_CLASS_NAME);
      field.value = field.getAttribute('placeholder');
    }
  }

  function removePlaceholder() {
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

  function destroyPlaceholder() {
    removeInteractions();
    removeValues();
  }

  initPlaceholder();

  /* Filed Interface */

  return {
    destroy: destroyPlaceholder,
  };
}

/* Inititalization */

function init() {
  const fields = [].slice.call(document.querySelectorAll('input, textarea'));
  fields.forEach(fieldPlaceholder);
}

function destroy(fields) {
  fields.forEach(field => field.destroy());
}

/* Interface */

exports.init = init;
exports.destroy = destroy;
