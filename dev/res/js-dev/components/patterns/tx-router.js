const eventManager = require('./tx-event');
let task;

function go(url) {
  window.history.pushState(null, null, url);
  task();
}

function init(changeView) {
  task = changeView;
  eventManager.bind(window, 'popstate', task);
}

exports.init = init;
exports.go = go;
