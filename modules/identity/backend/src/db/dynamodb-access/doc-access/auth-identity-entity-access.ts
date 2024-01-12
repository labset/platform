import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess
} from '@labset/platform-core-backend';

import { AuthIdentity } from '../../api-access';
import { IdentityDynamoDbClients } from '../clients';
import { tables } from '../tables';

class AuthIdentityReadAccess extends DocEntityReadAccess<AuthIdentity> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.authIdentity);
    }
}

class AuthIdentityWriteAccess extends DocEntityWriteAccess<AuthIdentity> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.authIdentity);
    }
}

class AuthIdentityAccess extends DocEntityAccess<AuthIdentity> {
    constructor(clients: IdentityDynamoDbClients) {
        super(
            new AuthIdentityReadAccess(clients),
            new AuthIdentityWriteAccess(clients)
        );
    }
}

export { AuthIdentityAccess };
