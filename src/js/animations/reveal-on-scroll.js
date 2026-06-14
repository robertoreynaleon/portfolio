/* ==========================================================================
   Animation / Apparition progressive au scroll
   --------------------------------------------------------------------------
   Observe les elements marques avec data-reveal.
   Quand un element entre dans l'ecran, on ajoute la classe is-revealed.
   ========================================================================== */

const desktopRevealQuery = window.matchMedia('(min-width: 901px)');

function shouldReduceMotion() {
    return window.portfolioMotion?.shouldReduceMotion() ?? false;
}

function getRevealElements(root = document) {
    return root.querySelectorAll('[data-reveal]:not(.js-reveal)');
}

function prepareRevealElements(revealElements) {
    let cardIndex = 0;

    revealElements.forEach((element) => {
        element.classList.add('js-reveal');

        if (element.dataset.reveal === 'card') {
            const delay = desktopRevealQuery.matches ? cardIndex * 180 : 0;

            element.style.setProperty('--reveal-delay', `${delay}ms`);
            cardIndex += 1;
        }
    });
}

function revealWithoutAnimation(revealElements) {
    revealElements.forEach((element) => {
        element.classList.add('is-revealed');
    });
}

function observeRevealElements(revealElements) {
    if (!revealElements.length) {
        return;
    }

    if (shouldReduceMotion()) {
        revealWithoutAnimation(revealElements);
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            });
        },
        {
            root: null,
            rootMargin: '0px 0px -12% 0px',
            threshold: 0.15,
        },
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

function initRevealOnScroll(root = document) {
    const revealElements = getRevealElements(root);

    prepareRevealElements(revealElements);
    observeRevealElements(revealElements);
}

initRevealOnScroll();

document.addEventListener('projects:rendered', (event) => {
    initRevealOnScroll(event.detail.container);
});
