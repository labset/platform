import { CreateTableMigration } from '@labset/platform-core-backend';

import { tables } from '../tables';

class CreateAuthSessionTable extends CreateTableMigration {
    constructor() {
        super(tables.authSession);
    }
}

export { CreateAuthSessionTable };
