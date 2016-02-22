/* jshint browser:true */

'use strict';

var selector = require('./tx-selector.js');
var textContent = require('./tx-textContent.js');
var addEvent = require('./tx-event');

function FileInput(field, text) {

  var input;
  var className;
  var activeClassName;
  var wrapElement;
  var valueElement;
  var buttonElement;
  var buttonText;

  function fieldChange(event) {
    valueElement.textContent = input.value.split('\\')[2];
  }

  function fieldClick(event) {
    event.preventDefault();
    event.stopPropagation();
    addEvent.trigger(input, 'click', false);
  }

  function wrap() {
    var parent = input.parentNode;
    wrapElement = document.createElement('div');
    wrapElement.className = `${className}-wrap`;
    valueElement = document.createElement('div');
    valueElement.className = `${className}-value`;
    buttonElement = document.createElement('a');
    buttonElement.href = '#';
    buttonElement.textContent = buttonText;
    buttonElement.className = `${className}-button`;
    wrapElement.appendChild(valueElement);
    wrapElement.appendChild(buttonElement);
    parent.insertBefore(wrapElement, input);
    wrapElement.appendChild(input);
    input.className += ` ${className}-is-wrapped`;
  }

  function setup() {
    input = field;
    buttonText = text || 'Browse';
    className = input.className.split(' ')[0];
    activeClassName = `${className}-is-active`;
    wrap(input);
    addEvent.bind(input, 'change', fieldChange);
    addEvent.bind(wrapElement, 'click', fieldClick);
    addEvent.bind(buttonElement, 'click', fieldClick);
  }

  setup();

}

function selectFields(selectors) {
  if (!document.querySelectorAll) {
    selector.polyfill();
  }
  return document.querySelectorAll(selectors);
}

function init(selectors, text) {
  var fields = selectFields(selectors);
  textContent.polyfill();
  for (let index = 0, length = fields.length; index < length; index += 1) {
    let field = fields[index];
    new FileInput(field, text);
  }
}

exports.init = init;
