import { IDocEntityAccess } from '@labset/platform-core-backend';

import { AuthIdentity, AuthSession, TenantUser, TenantUser } from './entities';

interface IIdentityAccess<TSessionPayload> {
    authSession: IDocEntityAccess<AuthSession<TSessionPayload>>;
    authIdentity: IDocEntityAccess<AuthIdentity>;
    tenant: IDocEntityAccess<TenantUser>;
    tenantUser: IDocEntityAccess<TenantUser>;
}

type entityNames = keyof IIdentityAccess<unknown>;
export type { IIdentityAccess, entityNames };
