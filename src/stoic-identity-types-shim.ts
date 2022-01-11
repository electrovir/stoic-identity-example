/**
 * This file gives us types for Stoic Identity. This does not contain an exhaustive list of the
 * types. A better file for that is here:
 * https://github.com/electrovir/stoic-identity/blob/main/src/index.ts However, that fork of
 * stoic-identity is not merged and has a bug which caused me issues when I tried to use it
 * directly. The types are fine though (probably) since they don't actually exist at run time.
 */

import {SignIdentity} from '@dfinity/agent';
// ic-stoic-identity is not typed
// @ts-ignore
import {StoicIdentity as StoicIdentityImport} from 'ic-stoic-identity';

/** This is easier than creating a global .d.ts file... unless you're into that :P */
export const StoicIdentity: StoicIdentity & StoicIdentityStaticTypes = StoicIdentityImport;

type StoicIdentityStaticTypes = {
    disconnect(): Promise<void>;
};

export interface StoicIdentity extends SignIdentity {
    connect(): Promise<StoicIdentity>;
    load(host?: string): Promise<StoicIdentity | undefined>;
}
