/* jshint browser:true */

'use strict';

var querySelectorPolyfill = require('./tx-querySelectorAll.js');
var eventTools = require('./tx-event');

module.exports = _ => {

  var fields;

  function selectFields() {
    var fields;
    var fieldsPlaceholders = [];
    if (!document.querySelectorAll) {
      querySelectorPolyfill();
    }
    fields = document.querySelectorAll('input, textarea');
    for (let index = 0, length = fields.length; index < length; index += 1) {
      if (fields[index].getAttribute('placeholder') !== null) {
        fieldsPlaceholders.push(fields[index]);
      }
    }
    return fieldsPlaceholders;
  }

  function getTarget(event) {
    return event.currentTarget || event.srcElement;
  }

  function addPlaceholder(field) {
    if (field.value === '') {
      field.className = `${field.className} js-input-is-showingPlaceholder`;
      field.value = field.getAttribute('placeholder');
    }
  }

  function removePlaceholder(field) {
    if (field.value === field.getAttribute('placeholder')) {
      field.className = field.className.replace(' js-input-is-showingPlaceholder', '');
      field.value = '';
    }
  }

  function fieldFocus(event) {
    removePlaceholder(getTarget(event));
  }

  function fieldBlur(event) {
    addPlaceholder(getTarget(event));
  }

  fields = selectFields();
  for (let index = 0, length = fields.length; index < length; index += 1) {
    let field = fields[index];
    addPlaceholder(field);
    eventTools.bind(field, 'focus', fieldFocus);
    eventTools.bind(field, 'blur', fieldBlur);
  }

};
