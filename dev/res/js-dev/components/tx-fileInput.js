/* jshint browser:true */

'use strict';

var querySelectorPolyfill = require('./tx-querySelectorAll.js');
var textContentPolyfill = require('./tx-textContent.js');
var eventTools = require('./tx-event');

module.exports = (selectors, text) => {

  function fileInput(field, text) {

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
      eventTools.trigger(input, 'click', false);
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
      input.classList.add(`${className}-is-wrapped`);
    }

    input = field;
    buttonText = text || 'Browse';
    className = input.classList.item(0);
    activeClassName = `${className}-is-active`;
    wrap(input);
    eventTools.bind(input, 'change', fieldChange);
    eventTools.bind(wrapElement, 'click', fieldClick);
    eventTools.bind(buttonElement, 'click', fieldClick);

  }

  function selectFields(selectors) {
    if (!document.querySelectorAll) {
      querySelectorPolyfill();
    }
    return document.querySelectorAll(selectors);
  }

  var fields = selectFields(selectors);
  textContentPolyfill();
  for (let index = 0, length = fields.length; index < length; index += 1) {
    let field = fields[index];
    fileInput(field, text);
  }

};
