import { IDocEntityAccess } from '@labset/platform-core-backend';

import { AuthSession } from './entities';

interface IIdentityAccess<TSessionPayload> {
    authSession: IDocEntityAccess<AuthSession<TSessionPayload>>;
}

type entityNames = keyof IIdentityAccess<unknown>;
export type { IIdentityAccess, entityNames };
