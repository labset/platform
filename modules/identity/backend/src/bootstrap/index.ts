import { DynamoDbClientConfig } from '@labset/platform-core-backend';
import { SessionData } from 'express-session';

import { identityAccess, IdentityDynamoDbClients } from '../db';
import {
    AuthSessionService,
    IAuthSessionService,
    AuthIdentityService,
    IAuthIdentityService,
    ITenantService,
    TenantService
} from '../services';

interface IdentityBootstrap {
    services: {
        authSession: IAuthSessionService<SessionData>;
        authIdentity: IAuthIdentityService;
        tenant: ITenantService;
    };
}

const bootstrapIdentity = async (
    options: DynamoDbClientConfig,
    forceUpgrade: boolean = false
): Promise<IdentityBootstrap> => {
    const clients = new IdentityDynamoDbClients(options);
    await clients.upgrade({ force: forceUpgrade });
    const access = identityAccess<SessionData>(clients);
    return {
        services: {
            authSession: new AuthSessionService(access),
            authIdentity: new AuthIdentityService(access),
            tenant: new TenantService(access)
        }
    };
};

export { bootstrapIdentity };
export type { IdentityBootstrap };
