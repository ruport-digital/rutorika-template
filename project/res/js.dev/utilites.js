function whichDevice() {
	var USER_AGENT_STRING = navigator.userAgent.toLowerCase();
	var MOBILE_LIST = new Array("iphone os 5", "ipad; cpu os 5", "iphone", "ipad", "android 2", "android", "blackberry", "palmos");
	for (var DEVICE in MOBILE_LIST) {
		if (USER_AGENT_STRING.indexOf(MOBILE_LIST[DEVICE])>=0) {
			return MOBILE_LIST[DEVICE];
		}
	}
}

function whichTransitionEndEvent() {
	var TRANSITION;
	var ELEMENT = document.createElement("fakeelement");
	var TRANSITIONS = {
		"transition": "transitionend",
		"OTransition": "oTransitionEnd",
		"MozTransition": "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	};
	for(TRANSITION in TRANSITIONS){
		if(ELEMENT.style[TRANSITION] !== undefined) {
			return TRANSITIONS[TRANSITION];
		}
	}
}