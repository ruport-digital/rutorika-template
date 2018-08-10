/* eslint max-lines-per-function: 'off' */

import * as eventManager from 'patterns/tx-eventManager';

const SINGLE_EVENT = 'gesture:singleswipe';
const DOUBLE_EVENT = 'gesture:doubleswipe';
const PINCH_EVENT = 'gesture:pinch';
const PINCH_THRESHOLD = 100;

export default function gestures(catcher) {
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

  function processTouchMove(touchEvent, gestureEvent) {
    const delta = claculateDelta(touchEvent.touches[0]);
    eventManager.trigger(catcher, gestureEvent, false, 'UIEvent', { delta });
  }

  function onSingleToucheMove(event) {
    requestAnimationFrame(() => { processTouchMove(event, SINGLE_EVENT); });
  }

  function onDoubleToucheMove(event) {
    requestAnimationFrame(() => { processTouchMove(event, DOUBLE_EVENT); });
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
}
