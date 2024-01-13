import { CreateTableMigration } from '@labset/platform-core-backend';

import { tables } from '../tables';

class CreateTenantTable extends CreateTableMigration {
    constructor() {
        super(tables.tenant);
    }
}

export { CreateTenantTable };
