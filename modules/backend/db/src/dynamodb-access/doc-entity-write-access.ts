import type {
    BatchWriteCommandInput,
    DeleteCommandInput,
    PutCommandInput
} from '@aws-sdk/lib-dynamodb';
import {
    BatchWriteCommand,
    DeleteCommand,
    DynamoDBDocumentClient,
    PutCommand
} from '@aws-sdk/lib-dynamodb';

import {
    DocEntity,
    IDocEntityWriteAccess,
    SaveDocEntityInput
} from '../access';

import { IDynamoDbData } from './data';
import { IDocEntityTable } from './types';

class DocEntityWriteAccess<TEntity extends DocEntity>
    implements IDocEntityWriteAccess<TEntity>
{
    constructor(
        private readonly ddbDocClient: DynamoDBDocumentClient,
        private readonly data: IDynamoDbData,
        private readonly table: IDocEntityTable
    ) {}

    async saveOne(entity: SaveDocEntityInput<TEntity>): Promise<TEntity> {
        const item = this.mapEntityToItem(entity);
        const params: PutCommandInput = {
            TableName: this.table.name,
            Item: this.data.marshall({
                ...item
            })
        };

        await this.ddbDocClient.send(new PutCommand(params));
        // TODO: handle error
        return item as TEntity;
    }

    async removeOne(entity: Pick<TEntity, 'sort'>): Promise<void> {
        const params: DeleteCommandInput = {
            TableName: this.table.name,
            Key: {
                part: this.table.part,
                sort: entity.sort
            }
        };
        await this.ddbDocClient.send(new DeleteCommand(params));
    }

    async saveMany(
        entities: SaveDocEntityInput<TEntity>[]
    ): Promise<TEntity[]> {
        const items = entities.map((entity) => this.mapEntityToItem(entity));
        const putRequestItems = items.map((item) => ({
            PutRequest: {
                Item: { ...item }
            }
        }));
        const params: BatchWriteCommandInput = {
            RequestItems: {
                [this.table.name]: putRequestItems
            }
        };

        await this.ddbDocClient.send(new BatchWriteCommand(params));
        // TODO: handle error

        return items as TEntity[];
    }

    private mapEntityToItem(entity: SaveDocEntityInput<TEntity>): TEntity {
        const { sort, ...record } = entity;
        const id = `${this.table.part}---${sort}`;
        const createdAt = record.createdAt ?? new Date();
        const item = {
            id,
            part: this.table.part,
            sort,
            ...record,
            createdAt,
            updatedAt: new Date()
        };
        return item as TEntity;
    }
}

export { DocEntityWriteAccess };
