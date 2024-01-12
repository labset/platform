import { IDynamoDbMigration } from '@labset/platform-core-backend';

import { CreateAuthSessionTable } from './20240111231905_create-auth-session-table';
import { CreateAuthIdentityTable } from './20240112203721_create-auth-identity-table';

const createAuthSessionTable = new CreateAuthSessionTable();
const createAuthIdentityTable = new CreateAuthIdentityTable();
const migrations: IDynamoDbMigration[] = [
    createAuthSessionTable,
    createAuthIdentityTable
];

export default migrations;
