import { DocEntity } from '@labset/platform-core-backend';

interface AuthSession<TPayload> extends DocEntity {
    expiresAt: Date;
    payload: TPayload;
}

enum AuthIdentityProvider {
    GOOGLE = 'GOOGLE'
}

interface AuthIdentity extends DocEntity {
    profileId: string;
    provider: AuthIdentityProvider;
    profile: Record<string, unknown> & {
        name?: string;
        picture?: string;
        email?: string;
    };
    payload: Record<string, unknown>;
}

interface GoogleAuthIdentity extends AuthIdentity {
    provider: AuthIdentityProvider.GOOGLE;
}

interface AuthIdentityAware extends DocEntity {
    authIdentitySort: string;
}

interface Tenant extends DocEntity {
    name: string;
    settings: Record<string, unknown>;
}

interface TenantAware extends DocEntity {
    tenantSort: string;
}

interface TenantUser extends TenantAware, AuthIdentityAware {
    roles: Record<TenantUserRole, boolean>;
}

enum TenantUserRole {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST'
}

export { AuthIdentityProvider, TenantUserRole };
export type {
    AuthSession,
    AuthIdentity,
    GoogleAuthIdentity,
    Tenant,
    TenantUser
};
