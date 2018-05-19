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

export function string(axis, distance) {
  const css = properties(axis, distance);
  return `-webkit-transform:${css.propertyLayer};-moz-transform:${css.propertyLayer};-ms-transform:${css.property};-o-transform:${css.property};transform:${css.propertyLayer};`;
}
