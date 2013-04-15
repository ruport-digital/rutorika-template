var DEBUG_TOOLS = '<div class="debugTools"><ul class="lstRst"><li><label class="dTls-VR"><input type="checkbox" name="dTls-Section1" class="dTls-VRCheck"> Vertical Rhythm</label></li><li><label class="dTls-RG"><input type="checkbox" name="dTls-Section1" class="dTls-RGCheck"> Responsive Guide</label></li></ul><a href="#" class="debugToolsToggle"></a></div>';

function initDebug() {
	$(DEBUG_TOOLS).appendTo("body")
}

$(document).ready(function() {

	initDebug();

	$(".dTls-VRCheck").on("change", function(event) {
		var BODY = $("body");
		if (BODY.hasClass("debugRhythmLines")) {
			BODY.removeClass("debugRhythmLines")
		} else {
			BODY.addClass("debugRhythmLines")
		}
	});

	$(".dTls-RGCheck").on("change", function(event) {
		var BODY = $("body");
		if (BODY.hasClass("debugResponsiveGuide")) {
			BODY.removeClass("debugResponsiveGuide")
		} else {
			BODY.addClass("debugResponsiveGuide")
		}
	});

	$(".debugToolsToggle").on("click", function(event) {
		event.preventDefault();
		var OBJECT = $(".debugTools");
		if (OBJECT.hasClass("off")) {
			OBJECT.removeClass("off")
		} else {
			OBJECT.addClass("off")
		}
	})

});