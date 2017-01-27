/* jshint browser:true */

const eventManager = require('./tx-event');

const SINGLE_SWIPE = 'singleswipe';
const DOUBLE_EVENT = 'doubleswipe';
const PINCH_EVENT = 'pinch';
const PINCH_THRESHOLD = 100;

module.exports = (catcher) => {
  let downTouches;
  let downDistance;

  function calculateDistance(touches) {
    const sqrDiffX = Math.pow((touches[1].clientX - touches[0].clientX), 2);
    const sqrDiffY = Math.pow((touches[1].clientY - touches[0].clientY), 2);
    return Math.sqrt(sqrDiffX + sqrDiffY);
  }

  function claculateDelta(touch) {
    return {
      x: touch.clientX - downTouches[0].clientX,
      y: touch.clientY - downTouches[0].clientY,
    };
  }

  function onSingleToucheMove(event) {
    requestAnimationFrame(() => {
      const delta = claculateDelta(event.touches[0]);
      eventManager.trigger(catcher, SINGLE_SWIPE, false, 'UIEvent', { delta });
    });
  }

  function onDoubleToucheMove(event) {
    requestAnimationFrame(() => {
      const delta = claculateDelta(event.touches[0]);
      eventManager.trigger(catcher, DOUBLE_EVENT, false, 'UIEvent', { delta });
    });
  }

  function onPinch(event) {
    requestAnimationFrame(() => {
      const delta = calculateDistance(event.touches) - downDistance;
      eventManager.trigger(catcher, PINCH_EVENT, false, 'UIEvent', { delta });
    });
  }

  function onTouchEnd(event) {
    event.preventDefault();
    event.stopPropagation();
    eventManager.unbind(document, 'touchmove', onDoubleToucheMove);
    eventManager.unbind(document, 'touchmove', onPinch);
    eventManager.unbind(document, 'touchend', onTouchEnd);
  }

  function onTouchStart(event) {
    event.preventDefault();
    event.stopPropagation();
    downTouches = event.touches;
    if (downTouches.length === 1) {
      eventManager.bind(document, 'touchmove', onSingleToucheMove);
    } else {
      downDistance = calculateDistance(event.touches);
      eventManager.unbind(document, 'touchmove', onSingleToucheMove);
      if (downDistance <= PINCH_THRESHOLD) {
        eventManager.bind(document, 'touchmove', onDoubleToucheMove);
      } else {
        eventManager.bind(document, 'touchmove', onPinch);
      }
    }
    eventManager.bind(document, 'touchend', onTouchEnd);
  }

  eventManager.bind(catcher, 'touchstart', onTouchStart, false);
};
