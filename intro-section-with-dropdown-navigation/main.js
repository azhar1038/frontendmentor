document.querySelectorAll(".nav-item[data-type='dropdown']").forEach( navItem => {
  navItem.firstElementChild.addEventListener('click', () => {
    const expanded = navItem.getAttribute('aria-expanded');
    if (expanded === 'false') navItem.setAttribute('aria-expanded', 'true');
    else navItem.setAttribute('aria-expanded', 'false');
  });
});

const $menuButton = document.getElementById('primary-nav-button').addEventListener('click', () => {
  const $html = document.firstElementChild;
  const open = $html.getAttribute('data-nav-open');
  $html.setAttribute('data-nav-open', open === 'true' ? 'false' : 'true');
});