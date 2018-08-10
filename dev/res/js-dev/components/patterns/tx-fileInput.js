/* eslint max-lines-per-function: 'off' */

import * as eventManager from 'patterns/tx-eventManager';

const WRAP_CLASS_NAME_SUFFIX = '-wrap';
const VALUE_CLASS_NAME_SUFFIX = '-value';
const BUTTON_CLASS_NAME_SUFFIX = '-button';
const WRAPED_CLASS_NAME_SUFFIX = '-is-wrapped';

/* HTML */

function createWrap(className) {
  const element = document.createElement('div');
  element.className = `${className}${WRAP_CLASS_NAME_SUFFIX}`;
  return element;
}

function createValue(className) {
  const element = document.createElement('div');
  element.className = `${className}${VALUE_CLASS_NAME_SUFFIX}`;
  return element;
}

function createButton(className, text) {
  const element = document.createElement('a');
  element.href = '#';
  element.textContent = text;
  element.className = `${className}${BUTTON_CLASS_NAME_SUFFIX}`;
  return element;
}

function wrapInput(className, input, wrap, value, button) {
  const parent = input.parentNode;
  wrap.appendChild(value);
  wrap.appendChild(button);
  parent.insertBefore(wrap, input);
  input.classList.add(`${className}${WRAPED_CLASS_NAME_SUFFIX}`);
  wrap.appendChild(input);
}

/* Field Constructor */

function fileInput(field, text) {
  let input;
  let className;
  let wrap;
  let value;
  let button;

  /* Field Interactions */

  function onChange() {
    value.textContent = input.value.split('\\').pop();
  }

  function onWrapClick() {
    eventManager.trigger(input, 'click');
  }

  function onButtonClick(event) {
    event.preventDefault();
  }

  function initInteractions() {
    eventManager.bind(input, 'change', onChange);
    eventManager.bind(wrap, 'click', onWrapClick);
    eventManager.bind(button, 'click', onButtonClick);
  }

  function removeInteractions() {
    eventManager.unbind(input, 'change', onChange);
    eventManager.unbind(wrap, 'click', onWrapClick);
    eventManager.unbind(button, 'click', onButtonClick);
  }

  /* Field Initialization */

  function initValues() {
    input = field;
    className = input.classList.item(0);
    wrap = createWrap(className);
    value = createValue(className);
    button = createButton(className, text);
  }

  function initField() {
    initValues();
    wrapInput(className, input, wrap, value, button);
    initInteractions();
  }

  function removeValues() {
    input = null;
    className = null;
    wrap = null;
    value = null;
    button = null;
  }

  function destroyField() {
    removeInteractions();
    removeValues();
  }

  initField();

  /* Field Interface */

  return {
    destroy: destroyField,
  };
}

/* Initialization */

export function init(selector, text) {
  const fields = [].slice.call(document.querySelectorAll(selector));
  fields.forEach(field => fileInput(field, text));
}

export function destroy(fields) {
  fields.forEach(field => field.destroy());
}
