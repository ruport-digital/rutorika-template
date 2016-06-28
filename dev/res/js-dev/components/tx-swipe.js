/* jshint browser:true */

'use strict';

const DOT_NAVIGATION_CLASS = 'js-dotsNavigation';
const DOT_CLASS = 'js-dotsPage';
const DOT_CLASS_ACTIVE = 'js-dotsPage-is-active';
const CLASS_ACTIVE_SUFFIX = '-is-active';

function swipe(gallery, navigation, navigationItemClassName, jQDocument) {

  var transition = require('./tx-transition')();
  var translateGallery = require('./tx-translate').css;

  const SLIDE_THRESHOLD = 15;
  const NEXT_SHIFT = 50;
  const SLIDES_CLASS_FIXING = 'slides-are-fixing';
  const SLIDES_CLASS_CHANGING = 'slides-are-changing';

  var doc;
  var object;
  var links;
  var linkClassName;

  var pointStartX;
  var pointShift;
  var pointDiffX;
  var pointDiffXMargin;
  var positionStart;
  var linkActive;
  var index;
  var galleryStatus;
  var animationFrame;

  function shiftSlide() {
    var slideDistance;
    pointDiffXMargin = pointDiffX < 0 ? SLIDE_THRESHOLD : -SLIDE_THRESHOLD;
    if (galleryStatus === 'start' && pointDiffX > 0) {
      pointShift = 4;
      pointDiffXMargin = -pointShift;
    } else if (galleryStatus === 'end' && pointDiffX < 0) {
      pointShift = 4;
      pointDiffXMargin = pointShift;
    }
    slideDistance = positionStart + pointDiffX / pointShift + pointDiffXMargin;
    object.css(translateGallery('x', `${slideDistance}px`));
  }

  function finalizeSlide() {
    object
      .removeClass(`${SLIDES_CLASS_FIXING} ${SLIDES_CLASS_CHANGING}`)
      .off(transition);
  }

  function fixSlide() {
    if (Math.abs(pointDiffX) > SLIDE_THRESHOLD) {
      if (pointDiffX > NEXT_SHIFT && galleryStatus !== 'start') {
        index -= 1;
      } else if (pointDiffX < -NEXT_SHIFT && galleryStatus !== 'end') {
        index += 1;
      }
      linkActive.removeClass(`${linkClassName}${CLASS_ACTIVE_SUFFIX} ${DOT_CLASS_ACTIVE}`);
      links
        .filter(`.${linkClassName}:eq(${index})`)
        .addClass(`${linkClassName}${CLASS_ACTIVE_SUFFIX} ${DOT_CLASS_ACTIVE}`);
      object
        .addClass(SLIDES_CLASS_FIXING)
        .trigger('swipe');
      object
        .on(transition, finalizeSlide)
        .css(translateGallery('x', `${-100 * index}%`));
    }
  }

  function getData(event) {
    pointStartX = event ? event.originalEvent.touches[0].pageX : 0;
    pointShift = 1;
    positionStart = object.offset().left;
    linkActive = links.filter(`.${linkClassName}${CLASS_ACTIVE_SUFFIX}`);
    index = links.index(linkActive);
    if (index === 0) {
      galleryStatus = 'start';
    } else if (index === (links.size() - 1)) {
      galleryStatus = 'end';
    } else {
      galleryStatus = 'middle';
    }
  }

  function fakeSwipe(shift) {
    pointDiffX = shift;
    fixSlide();
  }

  function preChange(event) {
    if (event) {
      event.preventDefault();
    }
    getData();
    object.addClass(SLIDES_CLASS_CHANGING);
  }

  function prevItem(event) {
    preChange(event);
    if (galleryStatus !== 'start') {
      fakeSwipe(NEXT_SHIFT + 1);
    }
  }

  function nextItem(event) {
    preChange(event);
    if (galleryStatus !== 'end') {
      fakeSwipe(-NEXT_SHIFT - 1);
    }
  }

  function touchStart(event) {
    if (!object.is(`.${SLIDES_CLASS_FIXING}`) || !object.is(`.${SLIDES_CLASS_CHANGING}`)) {
      pointDiffX = 0;
      getData(event);
      doc
        .on('touchmove', touchMove)
        .on('touchend', touchEnd);
    }
  }

  function touchMove(event) {
    pointDiffX = event.originalEvent.touches[0].pageX - pointStartX;
    if (Math.abs(pointDiffX) > SLIDE_THRESHOLD) {
      event.preventDefault();
      animationFrame = requestAnimationFrame(shiftSlide);
    }
  }

  function touchEnd() {
    doc.off('touchmove touchend');
    cancelAnimationFrame(animationFrame);
    requestAnimationFrame(fixSlide);
  }

  function updateLinks() {
    linkActive.removeClass(`${linkClassName}${CLASS_ACTIVE_SUFFIX} ${DOT_CLASS_ACTIVE}`);
    links
      .filter(`.${linkClassName}:eq(${index})`)
      .addClass(`${linkClassName}${CLASS_ACTIVE_SUFFIX} ${DOT_CLASS_ACTIVE}`);
  }

  function setItem(newIndex) {
    linkActive = links.filter(`.${linkClassName}${CLASS_ACTIVE_SUFFIX}`);
    index = newIndex;
    object.css(translateGallery('x', `${-100 * index}%`));
    updateLinks();
  }

  function getNumber() {
    return index + 1;
  }

  function getSize() {
    return links.length;
  }

  doc = jQDocument;
  object = gallery;
  links = navigation;
  linkClassName = navigationItemClassName;
  object.on('touchstart', touchStart);

  return {
    prev: prevItem,
    next: nextItem,
    set: setItem,
    number: getNumber,
    size: getSize
  };

}

function init(gallery, navigation, navigationItemClassName, jQDocument) {
  return swipe(gallery, navigation, navigationItemClassName, jQDocument);
}

function dots(size, listClass, pageClass) {
  var navigation = `<ol class="${listClass} ${DOT_NAVIGATION_CLASS}"><li class="${pageClass} ${pageClass}${CLASS_ACTIVE_SUFFIX} ${DOT_CLASS_ACTIVE} ${DOT_CLASS}"></li>`;
  for (let index = 1; index < size; index += 1) {
    navigation += `<li class="${pageClass} ${DOT_CLASS}"></li>`;
  }
  navigation += '</ol>';
  return navigation;
}

exports.init = init;
exports.dots = dots;
