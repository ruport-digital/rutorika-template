/* jshint browser:true */

var TX_QUERY_SELECTOR_ALL = (function() {

  function polyfill() {
    document.querySelectorAll = document.body.querySelectorAll = Object.querySelectorAll = function querySelectorAllPolyfill(r, c, i, j, a) {
      var d = document;
      var s = d.createStyleSheet();
      var l;
      a = d.all;
      c = [];
      r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
      for (i = r.length; i--;) {
        s.addRule(r[i], 'k:v');
        for (j = a.length; j--;) {
          a[j].currentStyle.k && c.push(a[j]);
        }
        s.removeRule(0);
      }
      return c;
    };
  }

  return {
    polyfill: polyfill
  };

})();

module.exports = TX_QUERY_SELECTOR_ALL;
