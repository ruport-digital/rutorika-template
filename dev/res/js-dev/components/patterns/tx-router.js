import * as eventManager from 'patterns/tx-eventManager';

let task;

export function go(url) {
  window.history.pushState(null, null, url);
  task();
}

export function init(changeView) {
  task = changeView;
  eventManager.bind(window, 'popstate', task);
}
