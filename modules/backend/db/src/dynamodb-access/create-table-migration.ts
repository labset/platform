import {
    CreateTableCommand,
    DeleteTableCommand,
    DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import type {
    CreateTableCommandInput,
    DeleteTableCommandInput,
    TableDescription
} from '@aws-sdk/client-dynamodb';

import { IDynamoDbMigration } from './migration';
import { IDocEntityTable } from './types';

class CreateTableMigration implements IDynamoDbMigration {
    readonly TableName: string;
    constructor(table: IDocEntityTable) {
        this.TableName = table.name;
    }

    async up(client: DynamoDBClient): Promise<TableDescription[]> {
        const params: CreateTableCommandInput = {
            TableName: this.TableName,
            AttributeDefinitions: [
                { AttributeName: 'part', AttributeType: 'S' },
                { AttributeName: 'sort', AttributeType: 'S' }
            ],
            KeySchema: [
                { AttributeName: 'part', KeyType: 'HASH' },
                { AttributeName: 'sort', KeyType: 'RANGE' }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
        const { TableDescription } = await client.send(
            new CreateTableCommand(params)
        );
        return TableDescription ? [TableDescription] : [];
    }

    async down(client: DynamoDBClient): Promise<TableDescription[]> {
        const params: DeleteTableCommandInput = {
            TableName: this.TableName
        };
        const { TableDescription } = await client.send(
            new DeleteTableCommand(params)
        );
        return TableDescription ? [TableDescription] : [];
    }
}

export { CreateTableMigration };
