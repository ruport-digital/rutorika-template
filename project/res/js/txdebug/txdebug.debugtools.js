var DEBUG_TOOLS = '<div class="debugTools off"><ul class="lstRst"><li><label class="dTls-VR"><input type="checkbox" class="dTls-VRCheck"> Vertical Rhythm</label></li><li><label class="dTls-RG"><input type="checkbox" class="dTls-RGCheck"> Responsive Guide</label></li><li><label class="dTls-VR"><input type="checkbox" class="dTls-CNSLCheck"> Console</label></li></ul><a href="#" class="debugToolsToggle"></a></div><div class="debugConsole"></div>';

function initDebug() {
	$(DEBUG_TOOLS).appendTo("body");
}

window.log = function(){
	log.history = log.history || [];
	log.history.push(arguments);
	if (this.console) {
		console.log(Array.prototype.slice.call(arguments));
	}
	$(".debugConsole").append(Array.prototype.slice.call(arguments) + "<br>");
};

$(document).ready(function() {

	initDebug();

	var BODY = $("body");

	$(".dTls-VRCheck").on("change", function(event) {
		BODY.toggleClass("debugRhythmLines");
	});

	$(".dTls-RGCheck").on("change", function(event) {
		BODY.toggleClass("debugResponsiveGuide");
	});

	$(".dTls-CNSLCheck").on("change", function(event) {
		BODY.toggleClass("debugShowConsole");
	});

	$(".debugToolsToggle").on("click", function(event) {
		event.preventDefault();
		$(".debugTools").toggleClass("off");
	});

});