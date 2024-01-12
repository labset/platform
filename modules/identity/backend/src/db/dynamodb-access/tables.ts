import { IDocEntityTable } from '@labset/platform-core-backend';

import { entityNames } from '../api-access';

const tables: Record<entityNames, IDocEntityTable> = {
    authSession: {
        name: `platform-auth-session`,
        part: `GLOBAL`
    },
    authIdentity: {
        name: `platform-auth-identity`,
        part: `GLOBAL`
    }
};

export { tables };
