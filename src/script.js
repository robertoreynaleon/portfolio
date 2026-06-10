const siteHeader = document.querySelector('.site-header');

function updateHeaderState() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
}

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });
