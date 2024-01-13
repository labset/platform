import { IDocEntityAccess } from '@labset/platform-core-backend';

import { AuthIdentity, AuthSession, Tenant, TenantUser } from './entities';

interface IIdentityAccess<TSessionPayload> {
    authSession: IDocEntityAccess<AuthSession<TSessionPayload>>;
    authIdentity: IDocEntityAccess<AuthIdentity>;
    tenant: IDocEntityAccess<Tenant>;
    tenantUser: IDocEntityAccess<TenantUser>;
}

type entityNames = keyof IIdentityAccess<unknown>;
export type { IIdentityAccess, entityNames };
