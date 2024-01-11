import {
    DynamoDbClientConfig,
    DynamoDbClients
} from '@labset/platform-base-backend-db';

import migrations from './migrations';

class IdentityDynamoDbClients extends DynamoDbClients {
    constructor(options: DynamoDbClientConfig) {
        super(migrations, options);
    }
}

export { IdentityDynamoDbClients };
