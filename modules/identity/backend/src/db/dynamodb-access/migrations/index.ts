import { IDynamoDbMigration } from '@labset/platform-core-backend';

import { CreateAuthSessionTable } from './20240111231905_create-auth-session-table';
import { CreateAuthIdentityTable } from './20240112203721_create-auth-identity-table';
import { CreateTenantTable } from './20240113180651_create-tenant-table';
import { CreateTenantUserTable } from './20240113180716_create-tenant-user-table';

const createAuthSessionTable = new CreateAuthSessionTable();
const createAuthIdentityTable = new CreateAuthIdentityTable();
const createTenantTable = new CreateTenantTable();
const createTenantUserTable = new CreateTenantUserTable();

const migrations: IDynamoDbMigration[] = [
    createAuthSessionTable,
    createAuthIdentityTable,
    createTenantTable,
    createTenantUserTable
];

export default migrations;
