import { DynamoDbClientConfig } from '@labset/platform-core-backend';
import { SessionData } from 'express-session';

import { identityAccess, IdentityDynamoDbClients } from '../db';
import { AuthSessionService, IAuthSessionService } from '../services';
import {
    AuthIdentityService,
    IAuthIdentityService
} from '../services/auth-identity-service';

interface IdentityBootstrap {
    services: {
        authSession: IAuthSessionService<SessionData>;
        authIdentity: IAuthIdentityService;
    };
}

const bootstrapIdentity = async (
    options: DynamoDbClientConfig
): Promise<IdentityBootstrap> => {
    const clients = new IdentityDynamoDbClients(options);
    await clients.upgrade();
    const access = identityAccess<SessionData>(clients);
    return {
        services: {
            authSession: new AuthSessionService(access),
            authIdentity: new AuthIdentityService(access)
        }
    };
};

export { bootstrapIdentity };
export type { IdentityBootstrap };
