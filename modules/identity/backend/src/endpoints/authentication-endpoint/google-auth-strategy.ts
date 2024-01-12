import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { AuthIdentityProvider, GoogleAuthIdentity } from '../../db';

import { AuthenticationEndpointProps } from './types';

const googleAuthStrategy = async ({
    app,
    secrets,
    product,
    services
}: AuthenticationEndpointProps) => {
    const { clientID, clientSecret } = secrets.google;

    const google = new GoogleStrategy(
        {
            clientID,
            clientSecret,
            scope: ['profile'],
            callbackURL: `${product.gatewayUrl}/auth/google/callback`
        },
        (_token, _refresh, profile, done) => {
            const { id, _json } = profile;
            services.authIdentity
                .getOrCreateIdentity<GoogleAuthIdentity>({
                    profileId: id,
                    provider: AuthIdentityProvider.GOOGLE,
                    profile: { ..._json }
                })
                .then(({ provider, profileId }) => {
                    done(null, {
                        authIdentity: {
                            provider,
                            profileId
                        }
                    });
                })
                .catch((error) => done(error, undefined));
        }
    );

    app.get(
        `/gateway/${product.key}/auth/google`,
        passport.authenticate(google, {
            failureRedirect: product.baseUrl,
            keepSessionInfo: true
        })
    );

    app.get(
        `/gateway/${product.key}/auth/google/callback`,
        passport.authenticate(google, {
            failureRedirect: product.baseUrl,
            keepSessionInfo: true
        }),
        (request, response) => {
            if (request.session.claimToken) {
                response.redirect(
                    `${product.baseUrl}/#/sign-in?token=${request.session.claimToken}`
                );
            } else {
                response.redirect(`${product.baseUrl}/`);
            }
        }
    );
};

export { googleAuthStrategy };
