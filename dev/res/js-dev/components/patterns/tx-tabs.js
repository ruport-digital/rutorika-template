/* jshint browser:true */

'use strict';

var tabPair = require('./tx-tabPair.js');
var eventTool = require('./tx-event.js');

module.exports = (holderID, nodeSelector, defaultTab) => {

  var holder;
  var pairs;

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
    var tabObjects = typeof nodeSelector === 'string' ? document.getElementsByClassName(nodeSelector) : nodeSelector;
    tabObjects = [].slice.call(tabObjects);
    tabObjects.forEach(addPair);
  }

  function destroyPairs() {
    pairs.forEach(destroyPair);
  }

  /* Actions */

  function deactivateActive() {
    var active = findActive();
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
    var active = defaultTab || 0;
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
    nodeSelector = null;
    defaultTab = null;
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
    destroy: destroy
  };

};
