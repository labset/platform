import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess
} from '@labset/platform-core-backend';

import { Tenant } from '../../api-access';
import { IdentityDynamoDbClients } from '../clients';
import { tables } from '../tables';

class TenantReadAccess extends DocEntityReadAccess<Tenant> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.tenant);
    }
}

class TenantWriteAccess extends DocEntityWriteAccess<Tenant> {
    constructor(clients: IdentityDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.tenant);
    }
}

class TenantAccess extends DocEntityAccess<Tenant> {
    constructor(clients: IdentityDynamoDbClients) {
        super(new TenantReadAccess(clients), new TenantWriteAccess(clients));
    }
}

export { TenantAccess };
