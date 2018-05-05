import togglable from 'patterns/tx-togglable';

const ACTIVE_CLASS_NAME_SUFFIX = '-is-active';

export default function offscreenNav(toggleID, navigationID) {
  let navigation;
  let activeClassName;

  function toggleNavigation() {
    navigation.classList.toggle(activeClassName);
  }

  const toggle = document.getElementById(toggleID);
  navigation = document.getElementById(navigationID);
  activeClassName = `${navigationID}${ACTIVE_CLASS_NAME_SUFFIX}`;

  return togglable(toggle, toggleNavigation);
}
