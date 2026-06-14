/* ==========================================================================
   Animation / Header visible au scroll
   --------------------------------------------------------------------------
   Ajoute une classe au header quand la page est scrollée.
   Cette classe permet de changer le fond et la bordure en CSS.
   ========================================================================== */

const siteHeader = document.querySelector('.site-header');

function updateHeaderState() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
}

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });
