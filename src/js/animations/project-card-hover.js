/* ==========================================================================
   Animation / Interaction des cartes projets
   --------------------------------------------------------------------------
   Sur desktop, ajoute un etat au survol des cartes projets.
   Sur mobile, le meme etat apparait brievement au toucher.
   Le CSS utilise cet etat pour zoomer l'image, decaler le titre
   et afficher un petit indicateur numerote.
   ========================================================================== */

const desktopMediaQuery = window.matchMedia('(min-width: 901px)');

function shouldReduceMotion() {
    return window.portfolioMotion?.shouldReduceMotion() ?? false;
}

function getProjectCards(root = document) {
    return root.querySelectorAll('.project-card');
}

function createProjectIndicators(projectCards) {
    projectCards.forEach((card, index) => {
        const existingIndicator = card.querySelector('.project-card__indicator');

        if (existingIndicator) {
            return;
        }

        const indicator = document.createElement('span');
        indicator.className = 'project-card__indicator';
        indicator.setAttribute('aria-hidden', 'true');
        indicator.textContent = String(index + 1).padStart(2, '0');

        card.appendChild(indicator);
    });
}

function activateCard(card) {
    if (!desktopMediaQuery.matches || shouldReduceMotion()) {
        return;
    }

    card.classList.add('is-hovered');
}

function activateCardOnTouch(card) {
    if (desktopMediaQuery.matches || shouldReduceMotion()) {
        return;
    }

    card.classList.add('is-hovered');
}

function deactivateCard(card) {
    card.classList.remove('is-hovered');
}

function resetCardsOnMobile() {
    if (desktopMediaQuery.matches) {
        return;
    }

    getProjectCards().forEach((card) => {
        deactivateCard(card);
    });
}

function initProjectCardHover(root = document) {
    const projectCards = getProjectCards(root);

    if (!projectCards.length) {
        return;
    }

    createProjectIndicators(projectCards);

    projectCards.forEach((card) => {
        if (card.dataset.hoverReady === 'true') {
            return;
        }

        card.dataset.hoverReady = 'true';
        card.addEventListener('mouseenter', () => activateCard(card));
        card.addEventListener('mouseleave', () => deactivateCard(card));
        card.addEventListener('pointerdown', () => activateCardOnTouch(card));
        card.addEventListener('pointerup', () => deactivateCard(card));
        card.addEventListener('pointercancel', () => deactivateCard(card));
        card.addEventListener('pointerleave', () => deactivateCard(card));
    });

    desktopMediaQuery.addEventListener('change', resetCardsOnMobile);
}

initProjectCardHover();

document.addEventListener('projects:rendered', (event) => {
    initProjectCardHover(event.detail.container);
});
