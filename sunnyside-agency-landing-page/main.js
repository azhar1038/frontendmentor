const primaryNav = document.getElementById('primary-nav');
const primaryNavButton = primaryNav.querySelector('button');


primaryNavButton.addEventListener('click', ()=>{
  const expanded = primaryNav.getAttribute('aria-expanded') === 'true';
  primaryNav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
});