import { CreateTableMigration } from '@labset/platform-core-backend';

import { tables } from '../tables';

class CreateTenantUserTable extends CreateTableMigration {
    constructor() {
        super(tables.tenantUser);
    }
}

export { CreateTenantUserTable };
