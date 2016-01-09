/* jshint browser:true */

var TX_EVENT = (function() {

  function bind(object, type, callback) {
    if (document.addEventListener) {
      object.addEventListener(type, callback);
    } else {
      object.attachEvent(type, callback);
    }
  }

  return {
    bind: bind
  };

})();

module.exports = TX_EVENT;
