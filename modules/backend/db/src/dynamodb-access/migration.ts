import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

interface IDynamoDbMigration {
    readonly TableName: string;
    up: (client: DynamoDBClient) => Promise<void>;
    down: (client: DynamoDBClient) => Promise<void>;
}

export type { IDynamoDbMigration };
