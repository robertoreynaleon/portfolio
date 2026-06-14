/* ==========================================================================
   Animation / Apparition progressive au scroll
   --------------------------------------------------------------------------
   Observe les elements marques avec data-reveal.
   Quand un element entre dans l'ecran, on ajoute la classe is-revealed.
   ========================================================================== */

const revealElements = document.querySelectorAll('[data-reveal]');
const desktopRevealQuery = window.matchMedia('(min-width: 901px)');

function shouldReduceMotion() {
    return window.portfolioMotion?.shouldReduceMotion() ?? false;
}

function prepareRevealElements() {
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

function revealWithoutAnimation() {
    revealElements.forEach((element) => {
        element.classList.add('is-revealed');
    });
}

function observeRevealElements() {
    if (!revealElements.length) {
        return;
    }

    if (shouldReduceMotion()) {
        revealWithoutAnimation();
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

prepareRevealElements();
observeRevealElements();
