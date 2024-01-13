import { randomUUID } from 'crypto';

import {
    AuthIdentity,
    AuthIdentityProvider,
    identityAccess,
    IdentityDynamoDbClients,
    IIdentityAccess
} from '../../db';
import { testIdentityDynamoDbClients } from '../../db/test-access';
import { AuthIdentityService } from '../auth-identity-service';

import { ITenantService, TenantService } from './index';

describe('tenant-service', () => {
    let clients: IdentityDynamoDbClients;
    let access: IIdentityAccess<unknown>;
    let service: ITenantService;
    let owner: AuthIdentity;
    let ownerProfileId: string;

    beforeAll(async () => {
        clients = await testIdentityDynamoDbClients();
        access = identityAccess(clients);
        service = new TenantService(access);
        // create owner identity
        const authIdentityService = new AuthIdentityService(access);
        ownerProfileId = randomUUID();
        owner = await authIdentityService.getOrCreateIdentity({
            profile: {},
            provider: AuthIdentityProvider.GOOGLE,
            profileId: ownerProfileId
        });
        expect(owner).toBeDefined();
    });

    afterAll(async () => {
        await clients.destroy();
    });

    it('should create a tenant with owner, then authenticate', async () => {
        const tenantName = randomUUID();
        const created = await service.createTenant({
            name: tenantName,
            owner
        });
        expect(created).toBeDefined();
        expect(created.tenant.name).toEqual(tenantName);
        expect(created.owner.tenantSort).toEqual(created.tenant.sort);
        expect(created.owner.authIdentitySort).toEqual(owner.sort);

        const authenticated = await service.authenticateUsers({
            authIdentitySort: owner.sort
        });
        expect(authenticated).toBeDefined();
        expect(authenticated!.users.length).toEqual(1);
        expect(authenticated!.users[0]).toEqual(created.owner);
    });
});
