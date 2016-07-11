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

function trigger(object, event, propagate, data) {
  propagate = propagate || false;
  if (document.createEvent) {
    let eventObj = document.createEvent('UIEvents');
    if (data) {
      eventObj.data = data;
    }
    eventObj.initEvent(event, propagate, false);
    object.dispatchEvent(eventObj);
  } else {
    let eventObj = document.createEventObject();
    if (data) {
      eventObj.data = data;
    }
    object.fireEvent(`on${event}`, eventObj);
  }
}

function target(event) {
  return event.target || event.srcElement;
}

exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
exports.target = target;
