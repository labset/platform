import { AuthIdentity, IIdentityAccess, Tenant, TenantUser } from '../../db';

interface ITenantService {
    authenticateUsers(input: {
        profileId: string;
        tenantId?: string;
    }): Promise<{
        identity: AuthIdentity;
        users: TenantUser[];
    } | null>;

    createTenant(input: {
        name: string;
        owner: Pick<AuthIdentity, 'id' | 'sort'>;
    }): Promise<{ tenant: Tenant; owner: TenantUser }>;
}

class TenantService implements ITenantService {
    constructor(private readonly access: IIdentityAccess<unknown>) {}

    async authenticateUsers(_input: {
        profileId: string;
        tenantId?: string;
    }): Promise<{
        identity: AuthIdentity;
        users: TenantUser[];
    } | null> {
        throw new Error('implement me');
    }

    async createTenant(_input: {
        name: string;
        owner: Pick<AuthIdentity, 'id' | 'sort'>;
    }): Promise<{
        tenant: Tenant;
        owner: TenantUser;
    }> {
        throw new Error('implement me');
    }
}

export { TenantService };
export type { ITenantService };
