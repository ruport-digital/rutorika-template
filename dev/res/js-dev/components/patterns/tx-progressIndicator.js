/* eslint max-lines-per-function: 'off' */

const TRACK_SUFFIX = 'Track';
const INDICATOR_SUFFIX = 'Indicator';
const PERCENTAGE_SUFFIX = 'Percentage';

const SIZE = 200;

export default function progressIndicator(id, className) {
  let container;
  let svg;
  let track;
  let indicator;
  let percentage;
  let progress;
  let length;

  function createSVG(svgClassName) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    element.setAttribute('width', SIZE);
    element.setAttribute('height', SIZE);
    element.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
    element.setAttribute('class', svgClassName);
    return element;
  }

  function createCircle(circleClassName) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const half = SIZE / 2;
    circle.setAttribute('cx', half);
    circle.setAttribute('cy', half);
    circle.setAttribute('r', half - 2);
    circle.setAttribute('class', circleClassName);
    return circle;
  }

  function createPercentage(percentageClassName) {
    const element = document.createElement('div');
    element.className = percentageClassName;
    return element;
  }

  function createDOM() {
    svg.appendChild(track);
    svg.appendChild(indicator);
    container.appendChild(svg);
    container.appendChild(percentage);
  }

  function calculatePercentage() {
    return `${100 * progress}%`;
  }

  function calculateDashArray() {
    const dashLength = length * progress;
    return `${dashLength} ${length - dashLength}`;
  }

  function setProgress(amount) {
    progress = amount;
    percentage.textContent = calculatePercentage();
    indicator.setAttribute('style', `stroke-dasharray: ${calculateDashArray()}`);
  }

  function init() {
    container = document.getElementById(id);
    svg = createSVG(className);
    track = createCircle(`${className}${TRACK_SUFFIX}`);
    indicator = createCircle(`${className}${INDICATOR_SUFFIX}`);
    percentage = createPercentage(`${className}${PERCENTAGE_SUFFIX}`);
    length = Math.PI * SIZE;
  }

  init();
  createDOM();

  return {
    set: setProgress,
  };
}
