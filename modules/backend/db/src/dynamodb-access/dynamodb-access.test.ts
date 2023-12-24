import { DocEntity } from '../access';

import { DynamoDbClients } from './clients';
import { CreateTableMigration } from './create-table-migration';
import { DocEntityAccess } from './doc-entity-access';
import { DocEntityReadAccess } from './doc-entity-read-access';
import { DocEntityWriteAccess } from './doc-entity-write-access';
import { IDocEntityTable } from './types';

describe('dynamodb-access', () => {
    let clients: DynamoDbClients;
    let access: TaskDocEntityAccess;
    beforeAll(async () => {
        const migrations = [new CreateTableMigration(taskTable)];
        clients = new DynamoDbClients(migrations, {
            region: 'local',
            endpoint: process.env.MOCK_DYNAMODB_ENDPOINT ?? 'oops'
        });
        await clients.upgrade();
        access = new TaskDocEntityAccess(clients);
    });
    afterAll(() => {
        clients.destroy();
    });

    it('saves one item', async () => {
        const item = await access.writer.saveOne({
            sort: 'one',
            summary: 'one'
        });
        const found = await access.reader.findBySort({ sort: item.sort });
        expect(found).toEqual(item);
        const all = await access.reader.query({});
        expect(all).toHaveLength(1);
        expect(all).toContainEqual(found);
    });

    it('saves many items', () => {});
});

interface Task extends DocEntity {
    summary: string;
}

const taskTable: IDocEntityTable = { name: 'task', part: 'GLOBAL' };
class TaskDocEntityReadAccess extends DocEntityReadAccess<Task> {
    constructor(clients: DynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), taskTable);
    }
}

class TaskDocEntityWriteAccess extends DocEntityWriteAccess<Task> {
    constructor(clients: DynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), taskTable);
    }
}

class TaskDocEntityAccess extends DocEntityAccess<Task> {
    constructor(clients: DynamoDbClients) {
        super(
            new TaskDocEntityReadAccess(clients),
            new TaskDocEntityWriteAccess(clients)
        );
    }
}
