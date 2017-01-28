module.exports = () => {
  const transitions = ['transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'transitionend', 'webkitTransitionEnd'];
  const element = document.createElement('element');
  let transitionEvent;
  transitions.some((transition) => {
    const condition = element.style[transition] !== undefined;
    if (condition) {
      transitionEvent = transition;
    }
    return condition;
  });
  return transitionEvent;
};
