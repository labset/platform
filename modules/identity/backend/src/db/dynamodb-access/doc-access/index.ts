import { IIdentityAccess } from '../../api-access';
import { IdentityDynamoDbClients } from '../clients';

import { AuthIdentityAccess } from './auth-identity-entity-access';
import { AuthSessionAccess } from './auth-session-entity-access';
import { TenantAccess } from './tenant-entity-access';
import { TenantUserAccess } from './tenant-user-entity-access';

const identityAccess = <TSessionPayload>(
    clients: IdentityDynamoDbClients
): IIdentityAccess<TSessionPayload> => {
    return {
        authSession: new AuthSessionAccess<TSessionPayload>(clients),
        authIdentity: new AuthIdentityAccess(clients),
        tenant: new TenantAccess(clients),
        tenantUser: new TenantUserAccess(clients)
    };
};

export { identityAccess };
