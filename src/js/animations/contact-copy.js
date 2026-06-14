/* ==========================================================================
   Animation / Copie rapide des coordonnees
   --------------------------------------------------------------------------
   Au clic sur le mail ou le telephone, la valeur est copiee.
   Un petit message "Copie" apparait ensuite pres du lien.
   ========================================================================== */

const copyLinks = document.querySelectorAll('.section-contact__link[data-copy]');

function createCopyMessage(link) {
    const existingMessage = link.parentElement.querySelector('.section-contact__copy-message');

    if (existingMessage) {
        existingMessage.remove();
    }

    const message = document.createElement('span');
    message.className = 'section-contact__copy-message';
    message.textContent = 'Copié';
    message.setAttribute('role', 'status');

    link.parentElement.appendChild(message);

    window.setTimeout(() => {
        message.remove();
    }, 1300);
}

async function copyText(text) {
    if (!navigator.clipboard) {
        return false;
    }

    await navigator.clipboard.writeText(text);
    return true;
}

function initContactCopy() {
    copyLinks.forEach((link) => {
        link.addEventListener('click', async (event) => {
            const textToCopy = link.dataset.copy;

            if (!textToCopy) {
                return;
            }

            try {
                const hasCopied = await copyText(textToCopy);

                if (hasCopied) {
                    event.preventDefault();
                    createCopyMessage(link);
                }
            } catch (error) {
                console.warn('La copie a echoue.', error);
            }
        });
    });
}

initContactCopy();
