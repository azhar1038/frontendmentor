document.querySelectorAll(".article-info")
  .forEach(article => {
    const btn = article.querySelector(".article-share");
    if (btn) {
      btn.addEventListener('click', () => {
        toggleShareMenu(article, btn);
      });
    }
  });

/**
 * Handles toggling of share menu
 * @param {Element} parent - The main element containing author, share button and links
 * @param {Element} child - The share button
 * @returns {void}
*/
function toggleShareMenu(parent, child) {
  const dataShare = parent.getAttribute('data-share');
  const isShareActive = dataShare && dataShare == 'true';
  parent.setAttribute('data-share', isShareActive ? 'false' : 'true');
  child.setAttribute('aria-label', isShareActive ? 'Open share menu' : 'Close share menu');
}