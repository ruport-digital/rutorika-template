/* jshint browser:true */

'use strict';

var togglable = require('./tx-togglable');

const ACTIVE_CLASS_NAME_SUFFIX = '-is-active';

module.exports = (toggleID, navigationID) => {

  var toggle;
  var navigation;

  var activeClassName;

  function toggleNavigation() {
    navigation.classList.toggle(activeClassName);
  }

  toggle = document.getElementById(toggleID);
  navigation = document.getElementById(navigationID);
  activeClassName = `${navigationID}${ACTIVE_CLASS_NAME_SUFFIX}`;

  return togglable(toggle, toggleNavigation);

};
