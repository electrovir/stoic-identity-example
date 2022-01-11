import {
    createNewStoicIdentityConnection,
    disconnectFromStoicIdentity,
    loadStoredStoicIdentity,
} from './stoic-identity-connect';
import {StoicIdentity} from './stoic-identity-types-shim';

type Elements = Record<
    'loadingDiv' | 'principalDiv' | 'connectButton' | 'logoutButton',
    HTMLElement
>;

async function onLoad(elements: Elements) {
    console.info('Loading stored Stoic Identity...');
    const loadedAuth = await loadStoredStoicIdentity();

    elements.loadingDiv.setAttribute('hidden', '');

    if (loadedAuth) {
        console.info('Stored Stoic Identity loaded:', loadedAuth);
        showAuth(loadedAuth, elements);
    } else {
        console.info(
            `No stored Stoic Identity found.
            This will happen with third party cookies turn off in Brave as the error above likely says AND in Safari if "Prevent cross-site tracking" is turned on.
            Of course this also happens if you have yet to connect on this page.`,
        );
        elements.connectButton.removeAttribute('hidden');
    }
}

function showAuth(stoicIdentity: StoicIdentity, elements: Elements) {
    elements.principalDiv.removeAttribute('hidden');
    elements.principalDiv.innerHTML = `<div>Connected with Principal:</div><div>${stoicIdentity
        .getPrincipal()
        .toString()}</div>`;
    elements.logoutButton.removeAttribute('hidden');
    elements.connectButton.setAttribute('hidden', '');
}

async function logout({principalDiv, connectButton, logoutButton}: Elements) {
    await disconnectFromStoicIdentity();
    principalDiv.setAttribute('hidden', '');
    logoutButton.setAttribute('hidden', '');
    connectButton.removeAttribute('hidden');
}

function main() {
    const loadingDiv = document.getElementById('loading');
    const principalDiv = document.getElementById('principal');
    const connectButton = document.getElementById('connect');
    const logoutButton = document.getElementById('logout');

    if (!loadingDiv || !principalDiv || !connectButton || !logoutButton) {
        console.error({loadingDiv, principalDiv, connectButton, logoutButton});
        throw new Error(`Could not find all the elements.`);
    }

    const elements: Elements = {loadingDiv, principalDiv, connectButton, logoutButton};

    connectButton.addEventListener('click', async () => {
        console.info('Connecting to Stoic Identity...');
        const newStoicIdentity = await createNewStoicIdentityConnection();
        console.info('Connected to Stoic Identity:', newStoicIdentity);
        showAuth(newStoicIdentity, elements);
    });

    logoutButton.addEventListener('click', () => {
        console.info('Disconnecting from Stoic Identity connection...');
        logout(elements);
    });

    onLoad(elements);
}

main();
