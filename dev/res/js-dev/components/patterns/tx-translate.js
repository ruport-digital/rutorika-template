/* eslint max-lines-per-function: 'off' */

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

export function css(axis, distance) {
  const style = properties(axis, distance);
  return {
    '-webkit-transform': style.propertyLayer,
    '-moz-transform': style.propertyLayer,
    '-ms-transform': style.property,
    '-o-transform': style.property,
    transform: style.propertyLayer,
  };
}

/* CSS String */

export function string(axis, distance) {
  const style = properties(axis, distance);
  return `-webkit-transform:${style.propertyLayer};-moz-transform:${style.propertyLayer};-ms-transform:${style.property};-o-transform:${style.property};transform:${style.propertyLayer};`;
}
