/* jshint browser:true */

'use strict';

/* Event Data */

function setData(event, data) {
  event.data = data;
  return event;
}

function getData(event) {
  return event.data;
}

/* Event Binding */

function bind(object, type, callback) {
  object.addEventListener(type, callback);
}

function unbind(object, type, callback) {
  object.removeEventListener(type, callback);
}

/* Event Trigger */

function triggerCreateEvent(object, eventName, propagate, eventType, data) {
  let event = document.createEvent(eventType);
  if (data) {
    setData(event, data);
  }
  event.initEvent(eventName, propagate, false);
  object.dispatchEvent(event);
}

function triggerCreateEventObject(object, eventName, propagate, data) {
  let event = document.createEventObject();
  if (data) {
    setData(event, data);
  }
  object.fireEvent(`on${eventName}`, event);
}

function trigger(object, eventName, propagate, eventType, data) {
  propagate = propagate || false;
  eventType = eventType || 'MouseEvents';
  if (document.createEvent) {
    triggerCreateEvent(object, eventName, propagate, eventType, data);
  } else {
    triggerCreateEventObject(object, eventName, propagate, data);
  }
}

/* Event Target */

function target(event) {
  return event.target;
}

/* Interface */

exports.getData = getData;
exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
exports.target = target;
