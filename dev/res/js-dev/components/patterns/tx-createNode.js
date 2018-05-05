export default function create(html) {
  const element = document.createElement('div');
  element.innerHTML = html;
  return element.firstChild;
}
