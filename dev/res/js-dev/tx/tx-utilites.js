/* global Modernizr:false */

function checkRAF() {
	return typeof(window.requestAnimationFrame) === "function" ? true : false;
}

function translateY(DISTANCE) {
	var CSS;
	if (Modernizr.csstransforms) {
		CSS = {
			"-webkit-transform": "translateY(" + DISTANCE + ") translateZ(0)",
			"-moz-transform": "translateY(" + DISTANCE + ") translateZ(0)",
			"-ms-transform": "translateY(" + DISTANCE + ") translateZ(0)",
			"-o-transform": "translateY(" + DISTANCE + ")",
			"transform": "translateY(" + DISTANCE + ") translateZ(0)"
		};
	} else {
		CSS = {
			"margin-top": DISTANCE
		};
	}
	return CSS;
}

function whichTransitionEndEvent() {
	var TRANSITION;
	var ELEMENT = document.createElement("element");
	var TRANSITIONS = {
		"transition": "transitionend",
		"oTransition": "oTransitionEnd",
		"MSTransition": "MSTransitionEnd",
		"MozTransition": "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	};
	for(TRANSITION in TRANSITIONS){
		if(ELEMENT.style[TRANSITION] !== undefined) {
			return TRANSITIONS[TRANSITION];
		}
	}
}

function whichDevice() {
	var USER_AGENT_STRING = navigator.userAgent.toLowerCase();
	var MOBILE_LIST = new Array("iphone os 5", "ipad; cpu os 5", "iphone", "ipad", "android 2", "android", "blackberry", "palmos");
	for (var DEVICE in MOBILE_LIST) {
		if (USER_AGENT_STRING.indexOf(MOBILE_LIST[DEVICE])>=0) {
			return MOBILE_LIST[DEVICE];
		}
	}
}
