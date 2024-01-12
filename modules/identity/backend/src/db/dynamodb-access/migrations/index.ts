import { IDynamoDbMigration } from '@labset/platform-core-backend';

import { CreateAuthSessionTable } from './20240111231905_create-auth-session-table';

const createAuthSessionTable = new CreateAuthSessionTable();
const migrations: IDynamoDbMigration[] = [createAuthSessionTable];

export default migrations;
