import { RequestHandler } from 'express';

import { claimTokenHandler } from './claim-token-handler';
import { googleAuthStrategy } from './google-auth-strategy';
import { AuthenticationEndpointProps } from './types';

const signOutHandler = (): RequestHandler => (request, response) => {
    request.logOut(() => {
        response.sendStatus(200);
    });
};

const authenticationEndpoint = async ({
    app,
    product,
    services,
    secrets
}: AuthenticationEndpointProps) => {
    await googleAuthStrategy({ app, product, services, secrets });
    app.post(
        `/gateway/${product.key}/auth/claim/token`,
        claimTokenHandler({ product })
    );
    app.get(`/gateway/${product.key}/auth/sign-out`, signOutHandler());
};

export { authenticationEndpoint };
