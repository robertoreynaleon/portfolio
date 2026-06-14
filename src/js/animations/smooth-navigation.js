/* ==========================================================================
   Animation / Navigation fluide et focus accessible
   --------------------------------------------------------------------------
   Intercepte les liens internes de navigation.
   Fait defiler vers la section cible puis place le focus dessus.
   ========================================================================== */

const internalNavigationLinks = document.querySelectorAll('a[href^="#"]');

function shouldReduceMotion() {
    return window.portfolioMotion?.shouldReduceMotion() ?? false;
}

function getTargetSection(link) {
    const targetId = link.getAttribute('href');

    if (!targetId || targetId === '#') {
        return null;
    }

    return document.getElementById(targetId.slice(1));
}

function focusTargetSection(targetSection) {
    targetSection.setAttribute('tabindex', '-1');
    targetSection.focus({ preventScroll: true });
}

function scrollToSection(targetSection) {
    targetSection.scrollIntoView({
        behavior: shouldReduceMotion() ? 'auto' : 'smooth',
        block: 'start',
    });
}

function initSmoothNavigation() {
    internalNavigationLinks.forEach((link) => {
        const targetSection = getTargetSection(link);

        if (!targetSection) {
            return;
        }

        link.addEventListener('click', (event) => {
            event.preventDefault();

            history.pushState(null, '', link.getAttribute('href'));
            scrollToSection(targetSection);

            window.setTimeout(() => {
                focusTargetSection(targetSection);
            }, shouldReduceMotion() ? 0 : 420);
        });
    });
}

initSmoothNavigation();
