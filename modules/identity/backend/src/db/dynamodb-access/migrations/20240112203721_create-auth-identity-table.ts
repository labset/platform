import { CreateTableMigration } from '@labset/platform-core-backend';

import { tables } from '../tables';

class CreateAuthIdentityTable extends CreateTableMigration {
    constructor() {
        super(tables.authIdentity);
    }
}

export { CreateAuthIdentityTable };
