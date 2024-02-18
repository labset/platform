import { IdentityDynamoDbClients } from '../dynamodb-access';

const testIdentityDynamoDbClients =
    async (): Promise<IdentityDynamoDbClients> => {
        // noinspection JSUnresolvedReference
        const clients = new IdentityDynamoDbClients({
            region: 'local',
            endpoint: process.env.MOCK_DYNAMODB_ENDPOINT ?? 'oops'
        });
        await clients.upgrade({ force: true });
        return clients;
    };

export { testIdentityDynamoDbClients };
