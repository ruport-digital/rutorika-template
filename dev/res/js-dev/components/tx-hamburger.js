/* jshint browser:true */

var TX_HAMBURGER = (function() {

  var object;
  var activeClassName;

  function toggle(event) {
    var currentClassName = object.className;
    event.preventDefault();
    object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : currentClassName + activeClassName;
  }

  function init(node) {
    if (node) {
      object = node;
      activeClassName = ' ' + object.className + '-is-active';
      if (document.addEventListener) {
        object.addEventListener('click', toggle);
      } else {
        object.attachEvent('onclick', toggle);
      }
    }
  }

  return {
    init: init
  };

})();

module.exports = TX_HAMBURGER;
