import {
    DynamoDbClientConfig,
    DynamoDbClients
} from '@labset/platform-core-backend';

import migrations from './migrations';

class IdentityDynamoDbClients extends DynamoDbClients {
    constructor(options: DynamoDbClientConfig) {
        super(migrations, options);
    }
}

export { IdentityDynamoDbClients };
