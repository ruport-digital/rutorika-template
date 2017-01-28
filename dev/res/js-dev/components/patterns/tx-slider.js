const eventTool = require('./tx-event');
const createNode = require('./tx-createNode');
const transition = require('./tx-transition')();
const translateGallery = require('./tx-translate').css;

const SLIDE_THRESHOLD = 15;
const NEXT_SHIFT = 50;

const SLIDER_CLASS_NAME = 'slider';
const SLIDER_FIXING_CLASS_NAME = `${SLIDER_CLASS_NAME}-is-fixing`;
const SLIDER_CHANGING_CLASS_NAME = `${SLIDER_CLASS_NAME}-is-changing`;
const SLIDER_EVENT = 'swipe';
const SLIDE_ACTIVE_CLASS_NAME_SUFFIX = '-is-active';
const DOT_NAVIGATION_CLASS_NAME = 'js-dotsNavigation';
const DOT_CLASS_NAME = 'js-dotsPage';
const DOT_ACTIVE_CLASS_NAME = `${DOT_CLASS_NAME}${SLIDE_ACTIVE_CLASS_NAME_SUFFIX}`;

/* Dots */

function generateNavigationDots(size, pageClassName) {
  let navigationDots = '';
  for (let index = 0; index < size; index += 1) {
    navigationDots += index === 0 ? `<li class="${pageClassName} ${pageClassName}${SLIDE_ACTIVE_CLASS_NAME_SUFFIX} ${DOT_ACTIVE_CLASS_NAME} ${DOT_CLASS_NAME}"></li>` : `<li class="${pageClassName} ${DOT_CLASS_NAME}"></li>`;
  }
  return navigationDots;
}

function dots(size, listClassName, pageClassName) {
  const navigation = `<ol class="${listClassName} ${DOT_NAVIGATION_CLASS_NAME}">${generateNavigationDots(size, pageClassName)}</ol>`;
  return createNode(navigation);
}

/* Slider Constructor */

function init(object, navigationObject, pageClassName) {
  let slider;
  let sliderDots;
  let sliderDotClassName;
  let sliderDotActiveClassName;
  let sliderFixing;
  let sliderChanging;
  let sliderMax;
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
    sliderFixing = fixing || sliderFixing;
    sliderChanging = changing || sliderChanging;
  }

  /* Slider Utilities */

  function updateDots() {
    getActiveSlideDot().classList.remove(getSliderDotActiveClassName(), DOT_ACTIVE_CLASS_NAME);
    setActiveSlideDot();
    getActiveSlideDot().classList.add(getSliderDotActiveClassName(), DOT_ACTIVE_CLASS_NAME);
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
    getSlider().style.transform = translateGallery('x', distance).transform;
  }

  function shiftSlider() {
    calculatePositions();
    translateSlider(calculateSlideDistance());
  }

  function finalizeSlide() {
    setStatus(false, false);
    getSlider().classList.remove(SLIDER_FIXING_CLASS_NAME, SLIDER_CHANGING_CLASS_NAME);
    eventTool.unbind(getSlider(), transition, finalizeSlide);
  }

  function updateInteractionParameters(event) {
    const startPoint = event ? event.touches[0].pageX : 0;
    setPointStartX(startPoint);
    setPointShift(1);
    setPointDiffX(0);
    setPositionStart(getSlider().getBoundingClientRect().left);
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

  function slide(index) {
    setActiveSlideIndex(index);
    updateDots();
    translateSlider(calculateCompleteDistance());
  }

  function positionSlider() {
    eventTool.trigger(getSlider(), SLIDER_EVENT, false, 'UIEvents');
    eventTool.bind(getSlider(), transition, finalizeSlide);
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

  function touchMove(event) {
    setPointDiffX(event.touches[0].pageX - getPointStartX());
    if (Math.abs(getPointDiffX()) > SLIDE_THRESHOLD) {
      event.preventDefault();
      setAnimationFrame(requestAnimationFrame(shiftSlider));
    }
  }

  function touchEnd() {
    eventTool.unbind(document, 'touchmove', touchMove);
    eventTool.unbind(document, 'touchend', touchEnd);
    cancelAnimationFrame(getAnimationFrame());
    requestAnimationFrame(fixSlider);
  }

  function touchStart(event) {
    const status = getStatus();
    if (!status.fixing || !status.changing) {
      updateInteractionParameters(event);
      eventTool.bind(document, 'touchmove', touchMove);
      eventTool.bind(document, 'touchend', touchEnd);
    }
  }

  function interactions() {
    eventTool.bind(getSlider(), 'touchstart', touchStart);
  }

  /* Slider Inititalization */

  function setDefaultValues() {
    setSlider();
    setSliderDotClassName();
    setSliderDots();
    setSliderMax();
    setActiveSlideIndex(0);
    setActiveSlideDot();
  }

  function initSlider() {
    setDefaultValues();
    interactions();
  }

  initSlider();

  /* Slider Interface */

  return {
    prev: prevItem,
    next: nextItem,
    set: slide,
  };
}

/* Interface */

exports.dots = dots;
exports.init = init;
