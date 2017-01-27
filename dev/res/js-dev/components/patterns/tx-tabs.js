/* jshint browser:true */

const tabPair = require('./tx-tabPair.js');
const eventTool = require('./tx-event.js');

module.exports = (holderID, nodeSelector, defaultTab) => {
  let holder;
  let pairs;

  /* Utilities */

  function addPair(tab) {
    pairs.push(tabPair(tab, holder));
  }

  function destroyPair(pair) {
    pair.destroy();
  }

  function activeFilter(pair) {
    return pair.status();
  }

  function findActive() {
    return pairs.filter(activeFilter)[0];
  }

  function makePairs() {
    const tabObjects = [].slice.call(typeof nodeSelector === 'string' ? document.getElementsByClassName(nodeSelector) : nodeSelector);
    tabObjects.forEach(addPair);
  }

  function destroyPairs() {
    pairs.forEach(destroyPair);
  }

  /* Actions */

  function deactivateActive() {
    const active = findActive();
    if (active) {
      active.deactivate();
    }
  }

  /* Events */

  function onTabSwitch() {
    deactivateActive();
  }

  function initEvents() {
    eventTool.bind(holder, 'tabswitch', onTabSwitch);
  }

  function removeEvents() {
    eventTool.unbind(holder, 'tabswitch', onTabSwitch);
  }

  /* Inititlization */

  function defaultValues() {
    pairs = [];
  }

  function activateDefault() {
    const active = defaultTab || 0;
    pairs[active].activate();
  }

  function init() {
    holder = document.getElementById(holderID);
    defaultValues();
    initEvents();
    makePairs();
    activateDefault();
  }

  function removeValues() {
    pairs = null;
  }

  function destroy() {
    destroyPairs();
    removeEvents();
    removeValues();
  }

  init();

  /* Interface */

  return {
    destroy,
  };
};
