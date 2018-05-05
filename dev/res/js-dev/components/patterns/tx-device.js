/* global Modernizr */

/* Device Size */

export function size() {
  return {
    width: window.screen.width,
    height: window.screen.height,
  };
}

/* Device Touch */

export function touch() {
  return Modernizr.touchevents;
}

/* Device */

export function detect() {
  return {
    touch: touch(),
    size: size(),
  };
}
