import { IDocEntityAccess } from '@labset/platform-core-backend';

import { AuthIdentity, AuthSession } from './entities';

interface IIdentityAccess<TSessionPayload> {
    authSession: IDocEntityAccess<AuthSession<TSessionPayload>>;
    authIdentity: IDocEntityAccess<AuthIdentity>;
}

type entityNames = keyof IIdentityAccess<unknown>;
export type { IIdentityAccess, entityNames };
