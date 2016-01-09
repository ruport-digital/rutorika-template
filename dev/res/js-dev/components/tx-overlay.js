/* jshint browser:true */

var TX_OVERLAY = (function() {

  var event = require('./tx-event');

  var object;
  var activeClassName;

  function toggle() {
    var currentClassName = object.className;
    event.preventDefault();
    object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : currentClassName + activeClassName;
  }

  function clicked() {
    var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    if (target.className.indexOf(activeClassName) > -1) {
      toggle();
    }
  }

  function init(node) {
    if (node) {
      object = node;
      activeClassName = ' ' + object.className + '-is-active';
      event(object, 'click', clicked);
    }
  }

  return {
    init: init,
    toggle: toggle
  };

})();

module.exports = TX_OVERLAY;
