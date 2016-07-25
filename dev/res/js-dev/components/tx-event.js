/* jshint browser:true */

'use strict';

function setData(event, data) {
  event.data = data;
  return event;
}

function getData(event) {
  return event.data;
}

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

function trigger(object, eventName, propagate, data) {
  propagate = propagate || false;
  if (document.createEvent) {
    let event = document.createEvent('UIEvents');
    if (data) {
      setData(event, data);
    }
    event.initEvent(eventName, propagate, false);
    object.dispatchEvent(event);
  } else {
    let event = document.createEventObject();
    if (data) {
      setData(event, data);
    }
    object.fireEvent(`on${eventName}`, event);
  }
}

function target(event) {
  return event.target || event.srcElement;
}

exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
exports.target = target;
exports.getData = getData;
exports.setData = setData;
