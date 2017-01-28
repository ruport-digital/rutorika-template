module.exports = (html) => {
  const element = document.createElement('div');
  element.innerHTML = html;
  return element.firstChild;
};
