/* jshint browser:true */

'use strict';

function bind(object, type, callback) {
  if (document.addEventListener) {
    object.addEventListener(type, callback);
  } else {
    object.attachEvent(`on${type}`, callback);
  }
}

function unbind(object, type, callback) {
  if (document.removeEventListener) {
    object.removeEventListener(type, callback);
  } else {
    object.detachEvent(`on${type}`, callback);
  }
}

function trigger(object, event, propagate) {
  propagate = propagate || false;
  var eventObj;
  if (document.createEvent) {
    eventObj = document.createEvent('MouseEvents');
    eventObj.initEvent(event, propagate, false);
    object.dispatchEvent(eventObj);
  } else {
    eventObj = document.createEventObject();
    object.fireEvent(`on${event}`, eventObj);
  }
}

exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
