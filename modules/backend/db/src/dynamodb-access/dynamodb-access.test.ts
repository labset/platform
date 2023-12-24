import { before } from 'node:test';

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

        access = new TaskDocEntityAccess(clients);
    });
    afterAll(() => {
        clients.destroy();
    });

    beforeEach(async () => {
        await clients.upgrade();
    });
    afterEach(async () => {
        await clients.rollback();
    });

    it('saves one item', async () => {
        const one = await access.writer.saveOne({
            sort: 'one',
            summary: 'one'
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

    it('saves many items', async () => {
        const one = { sort: 'one', summary: 'one' };
        const two = { sort: 'two', summary: 'two' };

        const [itemOne, itemTwo] = await access.writer.saveMany([one, two]);

        const all = await access.reader.query({});
        expect(all).toHaveLength(2);
        expect(all).toContainEqual(itemOne);
        expect(all).toContainEqual(itemTwo);
    });
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
