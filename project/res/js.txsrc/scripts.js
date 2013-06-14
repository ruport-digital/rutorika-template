$(document).ready(function() {});

function whichDevice() {
	var useragentstring = navigator.userAgent.toLowerCase();
	var mobilelist = new Array("iphone os 5", "ipad; cpu os 5", "iphone", "ipad", "android 2", "android", "blackberry", "palmos");
	for (var device in mobilelist) {
		if (useragentstring.indexOf(mobilelist[device])>=0) {
			return mobilelist[device];
		}
	}
}