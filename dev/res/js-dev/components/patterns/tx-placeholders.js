/* eslint max-lines-per-function: 'off' */

import * as eventManager from 'patterns/tx-eventManager';

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
    removePlaceholder(eventManager.target(event));
  }

  function onBlur(event) {
    addPlaceholder(eventManager.target(event));
  }

  function initInteractions() {
    eventManager.bind(field, 'focus', onFocus);
    eventManager.bind(field, 'blur', onBlur);
  }

  function removeInteractions() {
    eventManager.unbind(field, 'focus', onFocus);
    eventManager.unbind(field, 'blur', onBlur);
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

export function init() {
  const fields = [].slice.call(document.querySelectorAll('input, textarea'));
  fields.forEach(fieldPlaceholder);
}

export function destroy(fields) {
  fields.forEach(field => field.destroy());
}
