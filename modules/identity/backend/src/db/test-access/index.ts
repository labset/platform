import {IdentityDynamoDbClients} from "../dynamodb-access";

const testIdentityDynamoDbClients = async (): Promise<IdentityDynamoDbClients> => {
    const clients = new IdentityDynamoDbClients({
        region: 'local',
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT ?? 'oops'
    })
    await clients.upgrade();
    return clients;
}

export { testIdentityDynamoDbClients };