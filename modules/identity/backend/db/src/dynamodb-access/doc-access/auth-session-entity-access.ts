import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess
} from '@labset/platform-base-backend-db';

import { AuthSession } from '../../api-access';
import { IdentityDynamoDbClients } from '../clients';
import { tables } from '../tables';

class AuthSessionReadAccess<TSessionPayload> extends DocEntityReadAccess<
    AuthSession<TSessionPayload>
> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.authSession);
    }
}

class AuthSessionWriteAccess<TSessionPayload> extends DocEntityWriteAccess<
    AuthSession<TSessionPayload>
> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.authSession);
    }
}

class AuthSessionAccess<TSessionPayload> extends DocEntityAccess<
    AuthSession<TSessionPayload>
> {
    constructor(clients: IdentityDynamoDbClients) {
        super(
            new AuthSessionReadAccess(clients),
            new AuthSessionWriteAccess(clients)
        );
    }
}

export { AuthSessionAccess };
