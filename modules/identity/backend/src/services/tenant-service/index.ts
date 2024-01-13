import { DateTime } from 'luxon';
import { uid } from 'uid/secure';

import {
    AuthIdentity,
    IIdentityAccess,
    Tenant,
    TenantUser,
    TenantUserRole
} from '../../db';

interface ITenantService {
    authenticateUsers(input: {
        authIdentitySort: string;
        tenantSort?: string;
    }): Promise<{
        users: TenantUser[];
    } | null>;

    createTenant(input: {
        name: string;
        owner: AuthIdentity;
    }): Promise<{ tenant: Tenant; owner: TenantUser }>;
}

class TenantService implements ITenantService {
    constructor(private readonly access: IIdentityAccess<unknown>) {}

    async authenticateUsers({
        authIdentitySort,
        tenantSort
    }: {
        authIdentitySort: string;
        tenantSort?: string;
    }): Promise<{
        users: TenantUser[];
    } | null> {
        // TODO: this is bad, service shouldn't be aware of db indexes
        const users = await this.access.tenantUser.reader.query(
            {
                authIdentitySort
            },
            'auth-identity-index'
        );
        const filtered = tenantSort
            ? users.filter((user) => user.tenantSort === tenantSort)
            : users;
        return { users: filtered };
    }

    async createTenant({
        name,
        owner
    }: {
        name: string;
        owner: AuthIdentity;
    }): Promise<{
        tenant: Tenant;
        owner: TenantUser;
    }> {
        // TODO: this needs to be transactional
        // create tenant
        // create user with owner role and link user with auth identity
        const now = DateTime.now().toJSDate();
        const createdTenant = await this.access.tenant.writer.saveOne({
            name,
            sort: uid(32),
            createdAt: now
        });
        const createdTenantUser = await this.access.tenantUser.writer.saveOne({
            tenantSort: createdTenant.sort,
            authIdentitySort: owner.sort,
            roles: [TenantUserRole.OWNER],
            sort: uid(32),
            createdAt: now
        });
        return {
            tenant: createdTenant,
            owner: createdTenantUser
        };
    }
}

export { TenantService };
export type { ITenantService };
