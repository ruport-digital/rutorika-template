/* eslint max-lines-per-function: 'off' */

import * as eventManager from 'patterns/tx-eventManager';
import createNode from 'patterns/tx-createNode';
import transition from 'patterns/tx-transition';
import * as translate from 'patterns/tx-translate';

const SLIDER_CLASS_NAME = 'slider';
const SLIDER_FIXING_CLASS_NAME = `${SLIDER_CLASS_NAME}-is-fixing`;
const SLIDER_CHANGING_CLASS_NAME = `${SLIDER_CLASS_NAME}-is-changing`;
const SLIDE_ACTIVE_CLASS_NAME_SUFFIX = '-is-active';
const DOT_NAVIGATION_CLASS_NAME = 'js-dotsNavigation';
const DOT_CLASS_NAME = 'js-dotsPage';
const DOT_ACTIVE_CLASS_NAME = `${DOT_CLASS_NAME}${SLIDE_ACTIVE_CLASS_NAME_SUFFIX}`;

const TANSITION_EVENT = transition('transition', 'end');
const PRESWIPE_EVENT = 'slider:preswipe';
const SWIPE_EVENT = 'slider:swipe';

const SLIDE_THRESHOLD = 15;
const NEXT_SHIFT = 50;

/* Dots */

function generateNavigationDots(size, pageClassName) {
  let navigationDots = '';
  for (let index = 0; index < size; index += 1) {
    navigationDots += index === 0 ? `<li class="${pageClassName} ${pageClassName}${SLIDE_ACTIVE_CLASS_NAME_SUFFIX} ${DOT_ACTIVE_CLASS_NAME} ${DOT_CLASS_NAME}"></li>` : `<li class="${pageClassName} ${DOT_CLASS_NAME}"></li>`;
  }
  return navigationDots;
}

export function dots(size, listClassName, pageClassName) {
  const navigation = `<ol class="${listClassName} ${DOT_NAVIGATION_CLASS_NAME}">${generateNavigationDots(size, pageClassName)}</ol>`;
  return createNode(navigation);
}

/* Slider Constructor */

export function init(object, navigationObject, pageClassName) {
  let slider;
  let sliderDots;
  let sliderDotClassName;
  let sliderDotActiveClassName;
  let sliderFixing;
  let sliderChanging;
  let sliderMax;
  let sliderPosition;
  let activeSlideIndex;
  let activeSlideDot;
  let pointStartX;
  let pointShift;
  let pointDiffX;
  let positionStart;
  let animationFrame;

  /* Get */

  function getSlider() {
    return slider;
  }

  function getSliderDots() {
    return sliderDots;
  }

  function getSliderDot(index) {
    return getSliderDots()[index];
  }

  function getSliderDotClassName() {
    return sliderDotClassName;
  }

  function getSliderDotActiveClassName() {
    return sliderDotActiveClassName;
  }

  function getSliderMax() {
    return sliderMax;
  }

  function getSliderPosition() {
    return sliderPosition;
  }

  function getActiveSlideIndex() {
    return activeSlideIndex;
  }

  function getActiveSlideDot() {
    return activeSlideDot;
  }

  function getPointStartX() {
    return pointStartX;
  }

  function getPointShift() {
    return pointShift;
  }

  function getPointDiffX() {
    return pointDiffX;
  }

  function getPositionStart() {
    return positionStart;
  }

  function getAnimationFrame() {
    return animationFrame;
  }

  function getStatus() {
    return {
      fixing: sliderFixing,
      changing: sliderChanging,
    };
  }

  /* Set */

  function setSlider() {
    slider = object;
  }

  function setSliderDots() {
    sliderDots = navigationObject.getElementsByClassName(getSliderDotClassName());
  }

  function setSliderDotClassName() {
    sliderDotClassName = pageClassName;
    sliderDotActiveClassName = `${pageClassName}${SLIDE_ACTIVE_CLASS_NAME_SUFFIX}`;
  }

  function setSliderMax() {
    sliderMax = sliderDots.length - 1;
  }

  function setSliderPosition() {
    const parent = getSlider().parentElement;
    const offset = parent.getBoundingClientRect().left;
    const padding = parseInt(getComputedStyle(parent, null).getPropertyValue('padding-left'), 10);
    sliderPosition = offset + padding;
  }

  function setActiveSlideIndex(index) {
    activeSlideIndex = index;
  }

  function setActiveSlideDot() {
    activeSlideDot = getSliderDot(getActiveSlideIndex());
  }

  function setPointStartX(start) {
    pointStartX = start;
  }

  function setPointShift(shift) {
    pointShift = shift;
  }

  function setPointDiffX(diff) {
    pointDiffX = diff;
  }

  function setPositionStart(position) {
    positionStart = position;
  }

  function setAnimationFrame(frame) {
    animationFrame = frame;
  }

  function setStatus(fixing, changing) {
    sliderFixing = fixing;
    sliderChanging = changing;
  }

  /* Slider Utilities */

  function updateDots() {
    getActiveSlideDot().classList.remove(getSliderDotActiveClassName());
    getActiveSlideDot().classList.remove(DOT_ACTIVE_CLASS_NAME);
    setActiveSlideDot();
    getActiveSlideDot().classList.add(getSliderDotActiveClassName());
    getActiveSlideDot().classList.add(DOT_ACTIVE_CLASS_NAME);
  }

  function calculatePositions() {
    if (getActiveSlideIndex() === 0 && getPointDiffX() > 0) {
      setPointShift(4);
    } else if (getActiveSlideIndex() === getSliderMax() && getPointDiffX() < 0) {
      setPointShift(4);
    }
  }

  function calculateCompleteDistance() {
    return `${-100 * getActiveSlideIndex()}%`;
  }

  function calculateSlideDistance() {
    const correction = getPointDiffX() < 0 ? SLIDE_THRESHOLD : -SLIDE_THRESHOLD;
    return `${getPositionStart() + ((getPointDiffX() + correction) / getPointShift())}px`;
  }

  function translateSlider(distance) {
    getSlider().style.transform = translate.css('x', distance).transform;
  }

  function shiftSlider() {
    calculatePositions();
    translateSlider(calculateSlideDistance());
  }

  function finalizeSlide() {
    eventManager.trigger(getSlider(), SWIPE_EVENT, false, 'UIEvent');
    setStatus(false, false);
    getSlider().classList.remove(SLIDER_FIXING_CLASS_NAME);
    getSlider().classList.remove(SLIDER_CHANGING_CLASS_NAME);
    getSlider().removeEventListener(TANSITION_EVENT, finalizeSlide);
  }

  function updateInteractionParameters(event) {
    const startPoint = event ? event.touches[0].pageX : 0;
    setPointStartX(startPoint);
    setPointShift(1);
    setPointDiffX(0);
    setPositionStart(getSlider().getBoundingClientRect().left - getSliderPosition());
  }

  function preventClick(event) {
    if (event) {
      event.preventDefault();
    }
  }

  function increaseActiveSlideIndex() {
    setActiveSlideIndex(getActiveSlideIndex() + 1);
  }

  function deincreaseActiveSlideIndex() {
    setActiveSlideIndex(getActiveSlideIndex() - 1);
  }

  function slidingForward() {
    return getPointDiffX() < -NEXT_SHIFT && getActiveSlideIndex() !== getSliderMax();
  }

  function slidingBack() {
    return getPointDiffX() > NEXT_SHIFT && getActiveSlideIndex() !== 0;
  }

  function updateIndex() {
    if (slidingForward()) {
      increaseActiveSlideIndex();
    } else if (slidingBack()) {
      deincreaseActiveSlideIndex();
    }
  }

  /* Slider Actions */

  function setItem(index) {
    setActiveSlideIndex(index);
    updateDots();
    translateSlider(calculateCompleteDistance());
  }

  function slideItem(index) {
    getSlider().classList.add(SLIDER_CHANGING_CLASS_NAME);
    getSlider().addEventListener(TANSITION_EVENT, finalizeSlide);
    setItem(index);
  }

  function positionSlider() {
    eventManager.trigger(getSlider(), PRESWIPE_EVENT, false, 'UIEvent');
    getSlider().addEventListener(TANSITION_EVENT, finalizeSlide);
    setStatus(true, true);
    getSlider().classList.add(SLIDER_FIXING_CLASS_NAME);
    translateSlider(calculateCompleteDistance());
  }

  function fixSlider() {
    if (Math.abs(pointDiffX) > SLIDE_THRESHOLD) {
      updateIndex();
      updateDots();
      positionSlider();
    }
  }

  function fakeSwipe(fakeShift) {
    updateInteractionParameters();
    setPointDiffX(fakeShift);
    setStatus(true, true);
    getSlider().classList.add(SLIDER_CHANGING_CLASS_NAME);
    fixSlider();
  }

  function prevItem(event) {
    preventClick(event);
    if (getActiveSlideIndex() !== 0) {
      fakeSwipe(NEXT_SHIFT + 1);
    }
  }

  function nextItem(event) {
    preventClick(event);
    if (getActiveSlideIndex() !== getSliderMax()) {
      fakeSwipe(-NEXT_SHIFT - 1);
    }
  }

  /* Slider Interactions */

  function onTouchMove(event) {
    setPointDiffX(event.touches[0].pageX - getPointStartX());
    if (Math.abs(getPointDiffX()) > SLIDE_THRESHOLD) {
      event.preventDefault();
      setAnimationFrame(requestAnimationFrame(shiftSlider));
    }
  }

  function onTouchEnd() {
    document.removeEventListener('touchmove', onTouchMove, true);
    document.removeEventListener('touchend', onTouchEnd);
    cancelAnimationFrame(getAnimationFrame());
    requestAnimationFrame(fixSlider);
  }

  function onTouchStart(event) {
    event.preventDefault();
    const status = getStatus();
    if (!status.fixing || !status.changing) {
      updateInteractionParameters(event);
      document.addEventListener('touchmove', onTouchMove, true);
      document.addEventListener('touchend', onTouchEnd);
    }
  }

  function onResize() {
    setSliderPosition();
  }

  function subscribe() {
    getSlider().parentElement.addEventListener('touchstart', onTouchStart);
    window.addEventListener('resize', onResize);
  }

  /* Slider Inititalization */

  function setDefaultValues() {
    setSlider();
    setSliderDotClassName();
    setSliderDots();
    setSliderMax();
    setSliderPosition();
    setActiveSlideIndex(0);
    setActiveSlideDot();
  }

  function initSlider() {
    setDefaultValues();
    subscribe();
  }

  initSlider();

  /* Slider Interface */

  return {
    prev: prevItem,
    next: nextItem,
    set: setItem,
    slide: slideItem,
    current: getActiveSlideIndex,
    max: getSliderMax,
    object: getSlider,
  };
}
