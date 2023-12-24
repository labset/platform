import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import type { TableDescription } from '@aws-sdk/client-dynamodb';

interface IDynamoDbMigration {
    readonly TableName: string;
    up: (client: DynamoDBClient) => Promise<TableDescription[]>;
    down: (client: DynamoDBClient) => Promise<TableDescription[]>;
}

export type { IDynamoDbMigration };
