/* ==========================================================================
   Animation / Lien de navigation actif au scroll
   ========================================================================== */

const navLinks = document.querySelectorAll('.site-nav__link[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

let activeSectionId = null;

function setActiveLink(sectionId) {
    if (activeSectionId === sectionId) {
        return;
    }

    activeSectionId = sectionId;

    navLinks.forEach((link) => {
        const isCurrentLink = link.getAttribute('href') === `#${sectionId}`;

        link.classList.toggle('is-active', isCurrentLink);

        if (isCurrentLink) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function observeSections() {
    if (!navLinks.length || !sections.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        {
            root: null,
            rootMargin: '-38% 0px -52% 0px',
            threshold: 0,
        },
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
}

observeSections();
