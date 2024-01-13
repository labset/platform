import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess
} from '@labset/platform-core-backend';

import { TenantUser } from '../../api-access';
import { IdentityDynamoDbClients } from '../clients';
import { tables } from '../tables';

class TenantUserReadAccess extends DocEntityReadAccess<TenantUser> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.tenantUser);
    }
}

class TenantUserWriteAccess extends DocEntityWriteAccess<TenantUser> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.tenantUser);
    }
}

class TenantUserAccess extends DocEntityAccess<TenantUser> {
    constructor(clients: IdentityDynamoDbClients) {
        super(
            new TenantUserReadAccess(clients),
            new TenantUserWriteAccess(clients)
        );
    }
}

export { TenantUserAccess };
