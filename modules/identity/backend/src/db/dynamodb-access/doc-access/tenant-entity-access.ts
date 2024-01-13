import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess
} from '@labset/platform-core-backend';

import { TenantUser } from '../../api-access';
import { IdentityDynamoDbClients } from '../clients';
import { tables } from '../tables';

class TenantReadAccess extends DocEntityReadAccess<TenantUser> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.tenant);
    }
}

class TenantWriteAccess extends DocEntityWriteAccess<TenantUser> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.tenant);
    }
}

class TenantAccess extends DocEntityAccess<TenantUser> {
    constructor(clients: IdentityDynamoDbClients) {
        super(new TenantReadAccess(clients), new TenantWriteAccess(clients));
    }
}

export { TenantAccess };
