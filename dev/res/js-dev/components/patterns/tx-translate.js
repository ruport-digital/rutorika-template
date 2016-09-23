/* jshint browser:true */

'use strict';

/* Utilities */

function properties(axis, distance) {
  var property = `translate${axis.toUpperCase()}(${distance})`;
  return {
    property: property,
    propertyLayer: `${property} translateZ(0)`
  };
}

/* CSS Object */

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

/* CSS String */

function translateString(axis, distance) {
  var css = properties(axis, distance);
  return `-webkit-transform:${css.propertyLayer};-moz-transform:${css.propertyLayer};-ms-transform:${css.property};-o-transform:${css.property};transform:${css.propertyLayer};`;
}

/* Interface */

exports.css = translateCSS;
exports.string = translateString;
