/* jshint browser:true */
/* global Modernizr */

'use strict';

function size() {
  return {
    width: window.screen.width,
    height: window.screen.height
  };
}

function touch() {
  return Modernizr.touchevents;
}

function detect() {
  return {
    touch: touch(),
    size: size()
  };
}

exports.size = size;
exports.touch = touch;
exports.detect = detect;
