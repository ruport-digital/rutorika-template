/* jshint browser:true */

/* Utilities */

function properties(axis, distance) {
  const property = `translate${axis.toUpperCase()}(${distance})`;
  const propertyLayer = `${property} translateZ(0)`;
  return {
    property,
    propertyLayer,
  };
}

/* CSS Object */

function translateCSS(axis, distance) {
  const css = properties(axis, distance);
  return {
    '-webkit-transform': css.propertyLayer,
    '-moz-transform': css.propertyLayer,
    '-ms-transform': css.property,
    '-o-transform': css.property,
    transform: css.propertyLayer,
  };
}

/* CSS String */

function translateString(axis, distance) {
  const css = properties(axis, distance);
  return `-webkit-transform:${css.propertyLayer};-moz-transform:${css.propertyLayer};-ms-transform:${css.property};-o-transform:${css.property};transform:${css.propertyLayer};`;
}

/* Interface */

exports.css = translateCSS;
exports.string = translateString;
