/* ==========================================================================
   Donnees / Chargement des projets
   --------------------------------------------------------------------------
   Lit le fichier projets.json avec Fetch et rend les donnees disponibles
   pour generer les cartes projets dans une prochaine etape.
   ========================================================================== */

const PROJECTS_JSON_PATH = './data/projets.json';

async function loadProjects() {
    try {
        const response = await fetch(PROJECTS_JSON_PATH);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const projects = await response.json();

        if (!Array.isArray(projects)) {
            throw new Error('Le fichier projets.json doit contenir un tableau de projets.');
        }

        console.log('Projets charges depuis projets.json :', projects);

        window.portfolioProjects = projects;
        document.dispatchEvent(new CustomEvent('projects:loaded', {
            detail: {
                projects,
            },
        }));

        return projects;
    } catch (error) {
        console.error('Impossible de charger les projets :', error);

        window.portfolioProjects = [];
        return [];
    }
}

loadProjects();
