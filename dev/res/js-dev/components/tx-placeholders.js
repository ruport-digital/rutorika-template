/* jshint browser:true */
/* global Modernizr */

var TX_PLACEHOLDERS = (function() {

  var querySelectorPolyfill = require('./tx-selector.js');

  function selectFields() {
    var fields;
    var fieldsPlaceholders = [];
    var index = 0;
    var length;
    if (!document.querySelectorAll) {
      querySelectorPolyfill.polyfill();
    }
    fields = document.querySelectorAll('input, textarea');
    length = fields.length;
    for (index; index < length; index += 1) {
      if (fields[index].getAttribute('placeholder') !== null) {
        fieldsPlaceholders.push(fields[index]);
      }
    }
    return fieldsPlaceholders;
  }

  function appPlaceholder(field) {
    var value = field.value;
    var placeholder = field.getAttribute('placeholder');
    if (value === '') {
      field.className = field.className + ' js-input-is-showingPlaceholder';
      field.value = placeholder;
    }
  }

  function removePlaceholder(field) {
    var value = field.value;
    var placeholder = field.getAttribute('placeholder');
    if (value === placeholder) {
      field.className = field.className.replace(' js-input-is-showingPlaceholder', '');
      field.value = '';
    }
  }

  function focusHandler() {
    var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    removePlaceholder(target);
  }

  function blurHandler() {
    var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    appPlaceholder(target);
  }

  function polyfill() {
    if (!Modernizr.input.placeholder) {
      var fields = selectFields();
      var field;
      var index = 0;
      var length = fields.length;
      for (index; index < length; index += 1) {
        field = fields[index];
        appPlaceholder(field);
        if (document.addEventListener) {
          field.addEventListener('focus', focusHandler);
          field.addEventListener('blur', blurHandler);
        } else {
          field.attachEvent('onfocusin', focusHandler);
          field.attachEvent('onfocusout', blurHandler);
        }
      }
    }
  }

  return {
    polyfill: polyfill
  };

})();

module.exports = TX_PLACEHOLDERS;
