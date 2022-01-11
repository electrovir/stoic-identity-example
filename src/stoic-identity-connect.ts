import {StoicIdentity} from './stoic-identity-types-shim';

/**
 * Creates a new stoic login auth. This should only be called after first checking that
 * loadCurrentAuth return undefined, therefore requiring a new login.
 */
export async function createNewStoicIdentityConnection(): Promise<StoicIdentity> {
    // just in case, try to load the user's current auth anyway
    const currentStoicAuth = await loadStoredStoicIdentity();
    if (currentStoicAuth) {
        return currentStoicAuth;
    } else {
        const newStoicAuth = await StoicIdentity.connect();
        return newStoicAuth;
    }
}

export async function loadStoredStoicIdentity(): Promise<StoicIdentity | undefined> {
    const stoicIdentity = await StoicIdentity.load();
    if (stoicIdentity) {
        return stoicIdentity;
    } else {
        return undefined;
    }
}

export async function disconnectFromStoicIdentity(): Promise<void> {
    return StoicIdentity.disconnect();
}
