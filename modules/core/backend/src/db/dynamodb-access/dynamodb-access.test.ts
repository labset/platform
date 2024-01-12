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
    afterAll(async () => {
        const downgrades = await clients.rollback();
        expect(downgrades).toHaveLength(1);
        await clients.destroy();
    });

    it('read: finds nothing when store is empty', async () => {
        const none = await access.reader.query({});
        expect(none).toHaveLength(0);
    });

    it('read-write: saves one item', async () => {
        const one = await access.writer.saveOne({
            sort: 'one',
            summary: 'one',
            info: {
                author: 'me'
            }
        });
        const found = await access.reader.findBySort({ sort: one.sort });
        expect(found).toEqual(one);

        const all = await access.reader.query({});
        expect(all).toHaveLength(1);
        expect(all).toContainEqual(found);

        const listOfOne = await access.reader.query({ sort: one.sort });
        expect(listOfOne).toHaveLength(1);
        expect(listOfOne).toContainEqual(found);
    });

    it('read-write: saves many items and removes one', async () => {
        const one = { sort: 'one', summary: 'one' };
        const two = { sort: 'two', summary: 'two' };

        const [itemOne, itemTwo] = await access.writer.saveMany([one, two]);

        const all = await access.reader.query({});
        expect(all).toHaveLength(2);
        expect(all).toContainEqual(itemOne);
        expect(all).toContainEqual(itemTwo);

        await access.writer.removeOne(two);

        const notFound = await access.reader.findBySort(two);
        expect(notFound).toBeNull();

        const listOfOne = await access.reader.query({});
        expect(listOfOne).toHaveLength(1);
        expect(listOfOne).toContainEqual(itemOne);
    });
});

interface Task extends DocEntity {
    summary: string;
    info: Record<string, string>;
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
