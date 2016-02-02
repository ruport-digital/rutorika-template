/* jshint browser:true */

function which() {
  var transition;
  var element = document.createElement('element');
  var transitions = {
    'transition': 'transitionend',
    'oTransition': 'oTransitionEnd',
    'MSTransition': 'MSTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };
  for (transition in transitions) {
    if (element.style[transition] !== undefined) {
      return transitions[transition];
    }
  }
}

exports.which = which;
