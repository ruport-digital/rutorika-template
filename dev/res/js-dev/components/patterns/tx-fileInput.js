const eventTool = require('./tx-event');

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
    eventTool.trigger(input, 'click');
  }

  function onButtonClick(event) {
    event.preventDefault();
  }

  function initInteractions() {
    eventTool.bind(input, 'change', onChange);
    eventTool.bind(wrap, 'click', onWrapClick);
    eventTool.bind(button, 'click', onButtonClick);
  }

  function removeInteractions() {
    eventTool.unbind(input, 'change', onChange);
    eventTool.unbind(wrap, 'click', onWrapClick);
    eventTool.unbind(button, 'click', onButtonClick);
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

function init(selector, text) {
  const fields = [].slice.call(document.querySelectorAll(selector));
  fields.forEach(field => fileInput(field, text));
}

function destroy(fields) {
  fields.forEach(field => field.destroy());
}

/* Interface */

exports.init = init;
exports.destroy = destroy;
