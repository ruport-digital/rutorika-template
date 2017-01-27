/* jshint browser:true */
/* global Modernizr */

/* Device Size */

function size() {
  return {
    width: window.screen.width,
    height: window.screen.height,
  };
}

/* Device Touch */

function touch() {
  return Modernizr.touchevents;
}

/* Device */

function detect() {
  return {
    touch: touch(),
    size: size(),
  };
}

exports.size = size;
exports.touch = touch;
exports.detect = detect;
