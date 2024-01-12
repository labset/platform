import { IIdentityAccess } from '../../api-access';
import { IdentityDynamoDbClients } from '../clients';

import { AuthIdentityAccess } from './auth-identity-entity-access';
import { AuthSessionAccess } from './auth-session-entity-access';

const identityAccess = <TSessionPayload>(
    clients: IdentityDynamoDbClients
): IIdentityAccess<TSessionPayload> => {
    return {
        authSession: new AuthSessionAccess<TSessionPayload>(clients),
        authIdentity: new AuthIdentityAccess(clients)
    };
};

export { identityAccess };
