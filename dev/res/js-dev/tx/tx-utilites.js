/* jshint browser:true, jquery:true */
/* global Modernizr */

function translateY(distance) {
  var css;
  if (Modernizr.csstransforms) {
    css = {
      '-webkit-transform': 'translateY(' + distance + ') translateZ(0)',
      '-moz-transform': 'translateY(' + distance + ') translateZ(0)',
      '-ms-transform': 'translateY(' + distance + ')',
      '-o-transform': 'translateY(' + distance + ')',
      'transform': 'translateY(' + distance + ') translateZ(0)'
    };
  } else {
    css = {
      'margin-top': distance
    };
  }
  return css;
}

function whichTransitionEndEvent() {
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

function whichDevice() {
  var userAgentString = navigator.userAgent.toLowerCase();
  var devices = new Array('iphone os 5', 'ipad; cpu os 5', 'iphone', 'ipad', 'android 2', 'android', 'blackberry', 'palmos');
  for (var device in devices) {
    if (userAgentString.indexOf(devices[device]) >= 0) {
      return devices[device];
    }
  }
}

function placeholderPolyfill() {
  if (!Modernizr.input.placeholder) {
    $('input[placeholder]').each(function() {
      var input = $(this);
      var value = input.val();
      var placeholder = input.attr('placeholder');
      if (value === '') {
        input.addClass('u-input-is-showingPlaceholder').val(placeholder);
      }
    });
    $(document).on('focus', 'input[placeholder]', function() {
      var input = $(this);
      var value = input.val();
      var placeholder = input.attr('placeholder');
      if (value === placeholder) {
        input.removeClass('u-input-is-showingPlaceholder').val('');
      }
    }).on('blur', 'input[placeholder]', function() {
      var input = $(this);
      var value = input.val();
      var placeholder = input.attr('placeholder');
      if (value === '' || value === placeholder) {
        input.addClass('u-input-is-showingPlaceholder').val(placeholder);
      }
    });
  }
}
