import { CreateTableMigration } from '@labset/platform-base-backend-db';

import { tables } from '../tables';

class CreateAuthSessionTable extends CreateTableMigration {
    constructor() {
        super(tables.authSession);
    }
}

export { CreateAuthSessionTable };
