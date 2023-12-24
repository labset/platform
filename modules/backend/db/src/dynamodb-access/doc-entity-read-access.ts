import {
    DynamoDBDocumentClient,
    GetCommand,
    QueryCommand
} from '@aws-sdk/lib-dynamodb';
import type { GetCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';

import { DocEntity, IDocEntityReadAccess } from '../access';

import { IDynamoDbData } from './data';
import { IDocEntityTable } from './types';

class DocEntityReadAccess<TEntity extends DocEntity>
    implements IDocEntityReadAccess<TEntity>
{
    constructor(
        private readonly ddbDocClient: DynamoDBDocumentClient,
        private readonly data: IDynamoDbData,
        private readonly table: IDocEntityTable
    ) {}

    async findBySort({ sort }: { sort: string }): Promise<TEntity | null> {
        const params: GetCommandInput = {
            TableName: this.table.name,
            Key: {
                part: this.table.part,
                sort
            }
        };

        const { Item } = await this.ddbDocClient.send(new GetCommand(params));
        return this.data.unmarshall(Item) as TEntity;
    }

    async query(
        fields: Partial<TEntity>,
        indexName?: string
    ): Promise<TEntity[]> {
        const input = { ...fields, part: this.table.part };
        const condition = Object.keys(input)
            .map((key) => `${key} = :${key}`)
            .join(' AND ');
        const attributes = Object.entries(input).reduce(
            (data, entry) => {
                data[`:${entry[0]}`] = entry[1];
                return data;
            },
            {} as Record<string, unknown>
        );
        const params: QueryCommandInput = {
            TableName: this.table.name,
            KeyConditionExpression: condition,
            ExpressionAttributeValues: { ...attributes },
            IndexName: indexName
        };
        const { Items } = await this.ddbDocClient.send(
            new QueryCommand(params)
        );
        if (Items) {
            return Items.map(this.data.unmarshall) as TEntity[];
        }
        return [];
    }
}

export { DocEntityReadAccess };
