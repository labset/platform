import { IDocEntityTable } from '@labset/platform-base-backend-db';

import { entityNames } from '../api-access';

const tables: Record<entityNames, IDocEntityTable> = {
    authSession: {
        name: `todo-item`,
        part: `GLOBAL`
    }
};

export { tables };
