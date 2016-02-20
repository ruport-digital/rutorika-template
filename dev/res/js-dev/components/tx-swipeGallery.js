/* jshint browser:true */

var doc;
var object;
var links;
var linkClassName;
var transition = require('./tx-transition').which();
var translateGallery = require('./tx-translate').css;

var pointStartX;
var pointShift;
var pointDiffX;
var pointDiffXMargin;
var positionStart;
var linkActive;
var index;
var galleryStatus;
var animationFrame;

const SLIDE_THRESHOLD = 15;
const NEXT_SHIFT = 50;

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
  object.removeClass('slides-are-fixing');
  object.off(transition);
}

function fixSlide() {
  if (Math.abs(pointDiffX) > SLIDE_THRESHOLD) {
    if (pointDiffX > NEXT_SHIFT && galleryStatus !== 'start') {
      index -= 1;
    } else if (pointDiffX < -NEXT_SHIFT && galleryStatus !== 'end') {
      index += 1;
    }
    linkActive.removeClass(`${linkClassName}-is-active js-dotsPage-is-active`);
    links.filter(`.${linkClassName}:eq(${index})`).addClass(`${linkClassName}-is-active js-dotsPage-is-active`);
    object.addClass('slides-are-fixing').trigger('swipe');
    object.on(transition, finalizeSlide);
    object.css(translateGallery('x', `${-100 * index}%`));
  }
}

function getData(event) {
  pointStartX = event ? event.originalEvent.touches[0].pageX : 0;
  pointShift = 1;
  positionStart = object.offset().left;
  linkActive = links.filter(`.${linkClassName}-is-active`);
  index = links.index(linkActive);
  if (index === 0) {
    galleryStatus = 'start';
  } else if (index === (links.size() - 1)) {
    galleryStatus = 'end';
  } else {
    galleryStatus = 'middle';
  }
}

function prev() {
  getData();
  if (galleryStatus !== 'start') {
    pointDiffX = (NEXT_SHIFT + 1);
    fixSlide();
  }
}

function next() {
  getData();
  if (galleryStatus !== 'end') {
    pointDiffX = (-NEXT_SHIFT - 1);
    fixSlide();
  }
}

function touchStart(event) {
  if (!object.is('.slides-are-fixing')) {
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

function init(gallery, navigation, navigationItemClassName, jQDocument) {
  doc = jQDocument;
  object = gallery;
  links = navigation;
  linkClassName = navigationItemClassName;
  object.on('touchstart', touchStart);
}

function dots(size, listClass, pageClass) {
  var navigation = `<ul class="${listClass} js-dotsNavigation u-listReset">`;
  var index;
  for (index = 0; index < size; index++) {
    navigation = index === 0 ? navigation + `<li class="${pageClass} ${pageClass}-is-active js-dotsPage-is-active js-dotsPage"></li>` : navigation + `<li class="${pageClass} js-dotsPage"></li>`;
  }
  navigation += '</ul>';
  return navigation;
}

exports.init = init;
exports.dots = dots;
exports.prev = prev;
exports.next = next;
