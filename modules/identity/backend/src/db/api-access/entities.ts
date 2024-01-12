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

export { AuthIdentityProvider };
export type { AuthSession, AuthIdentity, GoogleAuthIdentity };
