/* jshint browser:true */

'use strict';

function properties(axis, distance) {
  var property = `translate${axis.toUpperCase()}(${distance})`;
  return {
    property: property,
    propertyLayer: `${property} translateZ(0)`
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
  return `-webkit-transform:${css.propertyLayer};-moz-transform:${css.propertyLayer};-ms-transform:${css.property};-o-transform:${css.property};transform:${css.propertyLayer};`;
}

exports.css = translateCSS;
exports.string = translateString;
