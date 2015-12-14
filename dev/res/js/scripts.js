(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require === 'function' && require;
        if (!u && a) {
          return a(o, !0);
        }
        if (i) {
          return i(o, !0);
        }
        var f = new Error('Cannot find module \'' + o + '\'');
        throw f.code = 'MODULE_NOT_FOUND', f;
      }
      var l = n[o] = { exports: {} };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = typeof require === 'function' && require;
  for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }
  return s;
}({
  1: [
    function (require, module, exports) {
      var TX_REQUEST_ANIMATION_FRAME = function () {
        function polyfill() {
          var lastTime = 0;
          var vendors = [
            'ms',
            'moz',
            'webkit',
            'o'
          ];
          for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
          }
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          }
          if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
              clearTimeout(id);
            };
          }
        }
        return { polyfill: polyfill };
      }();
      module.exports = TX_REQUEST_ANIMATION_FRAME;
    },
    {}
  ],
  2: [
    function (require, module, exports) {
      var rAF = require('./components/tx-rAF.js');
      rAF.polyfill();
    },
    { './components/tx-rAF.js': 1 }
  ]
}, {}, [2]));