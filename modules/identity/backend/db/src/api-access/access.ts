import { IDocEntityAccess } from '@labset/platform-base-backend-db';

import { AuthSession } from './entities';

interface IIdentityAccess<TSessionPayload> {
    authSession: IDocEntityAccess<AuthSession<TSessionPayload>>;
}

type entityNames = keyof IIdentityAccess<unknown>;
export type { IIdentityAccess, entityNames };
