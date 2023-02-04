document.getElementById('primary-nav-button').addEventListener('click', () => {
  const $html = document.firstElementChild;
  const open = $html.getAttribute('data-nav-open');
  $html.setAttribute('data-nav-open', open === 'true' ? 'false' : 'true');
});