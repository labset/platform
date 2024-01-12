import { Express } from 'express';
import { SessionData } from 'express-session';

import { IAuthSessionService } from '../../services';
import { IAuthIdentityService } from '../../services/auth-identity-service';

interface AuthenticationEndpointProps {
    app: Express;
    product: {
        key: string;
        baseUrl: string;
        gatewayUrl: string;
    };
    services: {
        authSession: IAuthSessionService<SessionData>;
        authIdentity: IAuthIdentityService;
    };
    secrets: {
        google: {
            clientID: string;
            clientSecret: string;
        };
    };
}

export type { AuthenticationEndpointProps };
