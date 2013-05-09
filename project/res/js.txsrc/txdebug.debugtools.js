var DEBUG_TOOLS = '<div class="debugTools off"><ul class="lstRst"><li><label class="dTls-VR"><input type="checkbox" name="dTls-Section1" class="dTls-VRCheck"> Vertical Rhythm</label></li><li><label class="dTls-RG"><input type="checkbox" name="dTls-Section1" class="dTls-RGCheck"> Responsive Guide</label></li></ul><a href="#" class="debugToolsToggle"></a></div>';

function initDebug() {
	$(DEBUG_TOOLS).appendTo("body");
}

$(document).ready(function() {

	initDebug();

	var BODY = $("body");

	$(".dTls-VRCheck").on("change", function(event) {
		BODY.toggleClass("debugRhythmLines");
	});

	$(".dTls-RGCheck").on("change", function(event) {
		BODY.toggleClass("debugResponsiveGuide");
	});

	$(".debugToolsToggle").on("click", function(event) {
		event.preventDefault();
		$(".debugTools").toggleClass("off");
	});

});