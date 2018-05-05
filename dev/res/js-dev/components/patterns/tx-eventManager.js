/* Event Data */

function setData(event, data) {
  const newEvent = event;
  newEvent.data = data;
  return newEvent;
}

export function getData(event) {
  return event.data;
}

/* Event Binding */

export function bind(object, type, callback) {
  object.addEventListener(type, callback);
}

export function unbind(object, type, callback) {
  object.removeEventListener(type, callback);
}

/* Event Trigger */

function triggerCreateEvent(object, eventName, propagate, eventType, data) {
  const event = document.createEvent(eventType);
  if (data) {
    setData(event, data);
  }
  event.initEvent(eventName, propagate, false);
  object.dispatchEvent(event);
}

function triggerCreateEventObject(object, eventName, propagate, data) {
  const event = document.createEventObject();
  if (data) {
    setData(event, data);
  }
  object.fireEvent(`on${eventName}`, event);
}

export function trigger(object, eventName, propagate = false, eventType = 'MouseEvents', data) {
  if (document.createEvent) {
    triggerCreateEvent(object, eventName, propagate, eventType, data);
  } else {
    triggerCreateEventObject(object, eventName, propagate, data);
  }
}

/* Event Target */

export function target(event) {
  return event.target;
}
