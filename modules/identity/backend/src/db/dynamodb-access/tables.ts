import { IDocEntityTable } from '@labset/platform-core-backend';

import { entityNames } from '../api-access';

const tables: Record<entityNames, IDocEntityTable> = {
    authSession: {
        name: `todo-item`,
        part: `GLOBAL`
    }
};

export { tables };
