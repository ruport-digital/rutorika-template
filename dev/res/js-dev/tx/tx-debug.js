/* global $:false */
/* global log:false */

var DEBUG_TOOLS = '<div class="debugTools"><ul class="u-listReset"><li><label class="dTls-VR"><input type="checkbox" class="dTls-VRCheck"> Vertical Rhythm</label></li><li><label class="dTls-VR"><input type="checkbox" class="dTls-CNSLCheck"> Console</label></li></ul><a href="#" class="debugToolsToggle"></a></div><div class="debugConsole"></div><div class="debugToolsRhythm"></div>';

function initDebug(BODY) {
  $(DEBUG_TOOLS).appendTo(BODY);
}

window.log = function() {
  log.history = log.history || [];
  log.history.push(arguments);
  if (this.console) {
    console.log(Array.prototype.slice.call(arguments));
  }
  $('.debugConsole').append(Array.prototype.slice.call(arguments) + '<br>');
};

$(document).ready(function() {

  var BODY = $('body');

  initDebug(BODY);

  $('.dTls-VRCheck').on('change', function(event) {
    var HEIGHT = BODY.height();
    $('.debugToolsRhythm').height(HEIGHT);
    BODY.toggleClass('page-is-showingRhythmLines');
  });

  $('.dTls-CNSLCheck').on('change', function(event) {
    BODY.toggleClass('page-is-showingConsole');
  });

  $('.debugToolsToggle').on('click', function(event) {
    event.preventDefault();
    BODY.toggleClass('page-is-showingDebugTools');
  });

});
