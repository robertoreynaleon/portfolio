/* ==========================================================================
   Donnees / Chargement et affichage des projets
   --------------------------------------------------------------------------
   Lit le fichier projets.json avec Fetch, puis cree les cartes projets
   directement dans le DOM.
   ========================================================================== */

const PROJECTS_JSON_PATH = './data/projets.json';
const projectsGrid = document.querySelector('#projects-grid');

function createProjectTitle(project) {
    const projectTitle = project.title || 'Projet';
    const title = document.createElement('h3');
    title.className = 'project-card__title';

    if (!project.highlight || !projectTitle.includes(project.highlight)) {
        title.textContent = projectTitle;
        return title;
    }

    const highlightPosition = projectTitle.indexOf(project.highlight);
    const beforeHighlight = projectTitle.slice(0, highlightPosition);
    const afterHighlight = projectTitle.slice(highlightPosition + project.highlight.length);
    const highlight = document.createElement('strong');

    highlight.textContent = project.highlight;
    title.append(beforeHighlight, highlight, afterHighlight);

    return title;
}

function createProjectVisual(project) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'project-card__image-wrapper';

    const image = document.createElement('img');
    image.className = 'project-card__image';
    image.src = project.image;
    image.alt = project.imageAlt || `Apercu du projet ${project.title || 'selectionne'}`;
    image.loading = 'lazy';

    imageWrapper.appendChild(image);

    return imageWrapper;
}

function createProjectContent(project) {
    const content = document.createElement('div');
    content.className = 'project-card__content';

    const subtitle = document.createElement('p');
    subtitle.className = 'project-card__subtitle';
    subtitle.textContent = project.subtitle || '';

    content.append(createProjectTitle(project), subtitle);

    const descriptions = Array.isArray(project.descriptions) ? project.descriptions : [];

    descriptions.forEach((descriptionText) => {
        const description = document.createElement('p');
        description.className = 'project-card__description';
        description.textContent = descriptionText;

        content.appendChild(description);
    });

    return content;
}

function createProjectBody(project) {
    const body = project.siteUrl ? document.createElement('a') : document.createElement('div');

    body.className = 'project-card__link';

    if (project.siteUrl) {
        body.href = project.siteUrl;
        body.target = '_blank';
        body.rel = 'noopener noreferrer';
        body.setAttribute('aria-label', `Voir le site du projet ${project.title || 'selectionne'}`);
    }

    body.append(createProjectVisual(project), createProjectContent(project));

    return body;
}

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.reveal = 'card';

    if (project.id) {
        card.id = project.id;
    }

    card.appendChild(createProjectBody(project));

    return card;
}

function renderProjects(projects) {
    if (!projectsGrid) {
        return;
    }

    projectsGrid.replaceChildren();

    projects.forEach((project) => {
        projectsGrid.appendChild(createProjectCard(project));
    });

    document.dispatchEvent(new CustomEvent('projects:rendered', {
        detail: {
            container: projectsGrid,
            projects,
        },
    }));
}

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
        renderProjects(projects);

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
