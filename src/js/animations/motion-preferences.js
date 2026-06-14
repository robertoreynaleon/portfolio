/* ==========================================================================
   Accessibilite / Preference systeme de reduction des animations
   --------------------------------------------------------------------------
   Detecte prefers-reduced-motion sans ajouter de bouton dans l'interface.
   Les autres animations consultent ce fichier avant de lancer un effet.
   ========================================================================== */

const motionPreferenceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function shouldReduceMotion() {
    return motionPreferenceQuery.matches;
}

function updateMotionClass() {
    document.documentElement.classList.toggle('has-reduced-motion', shouldReduceMotion());
}

window.portfolioMotion = {
    shouldReduceMotion,
};

updateMotionClass();
motionPreferenceQuery.addEventListener('change', updateMotionClass);
