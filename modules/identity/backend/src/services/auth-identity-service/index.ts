import { AuthIdentity, IIdentityAccess } from '../../db';

interface IAuthIdentityService {
    getIdentity<TIdentity extends AuthIdentity>(
        input: Pick<AuthIdentity, 'profileId' | 'provider'>
    ): Promise<TIdentity | null>;
    getOrCreateIdentity<TIdentity extends AuthIdentity>(
        input: Pick<AuthIdentity, 'profile' | 'provider' | 'profileId'>
    ): Promise<TIdentity>;
}

class AuthIdentityService implements IAuthIdentityService {
    constructor(private readonly access: IIdentityAccess<unknown>) {}

    async getIdentity<TIdentity extends AuthIdentity>({
        provider,
        profileId
    }: Pick<
        AuthIdentity,
        'profileId' | 'provider'
    >): Promise<TIdentity | null> {
        const identity = await this.access.authIdentity.reader.findBySort({
            sort: `${provider}:${profileId}`
        });
        if (identity === null) return null;
        return identity as TIdentity;
    }

    async getOrCreateIdentity<TIdentity extends AuthIdentity>({
        profile,
        provider,
        profileId
    }: Pick<
        AuthIdentity,
        'profile' | 'provider' | 'profileId'
    >): Promise<TIdentity> {
        const identity = await this.getIdentity<TIdentity>({
            provider,
            profileId
        });
        if (identity !== null) return identity;
        const created = await this.access.authIdentity.writer.saveOne({
            profile,
            profileId,
            provider,
            sort: `${provider}:${profileId}`,
            createdAt: new Date(),
            payload: {}
        });
        return created as TIdentity;
    }
}

export { AuthIdentityService };
export type { IAuthIdentityService };
