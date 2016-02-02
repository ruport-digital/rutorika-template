/* jshint browser:true */

function properties(axis, distance) {
  var property;
  var propertyLayer;
  axis = axis.toUpperCase();
  property = 'translate' + axis + '(' + distance + ')';
  propertyLayer = property + ' translateZ(0)';
  return {
    property: property,
    propertyLayer: propertyLayer
  };
}

function translateCSS(axis, distance) {
  var css = properties(axis, distance);
  return {
    '-webkit-transform': css.propertyLayer,
    '-moz-transform': css.propertyLayer,
    '-ms-transform': css.property,
    '-o-transform': css.property,
    'transform': css.propertyLayer
  };
}

function translateString(axis, distance) {
  var css = properties(axis, distance);
  return '-webkit-transform:' + css.propertyLayer + '; -moz-transform:' + css.propertyLayer + '; -ms-transform:' + css.property + '; -o-transform' + css.property + '; transform:' + css.propertyLayer + ';';
}

exports.css = translateCSS;
exports.string = translateString;
