import { Express, urlencoded, json } from 'express';
import session, { SessionData } from 'express-session';
import passport from 'passport';
import { uid } from 'uid/secure';

import { AuthIdentityProvider } from '../../db';
import { IAuthSessionService } from '../../services';

import { AuthSessionStore } from './auth-session-store';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // noinspection JSUnusedGlobalSymbols
        interface User {
            authIdentity: {
                provider: AuthIdentityProvider;
                profileId: string;
            };
        }
    }
}

interface WithPassportAuth {
    app: Express;
    services: {
        authSession: IAuthSessionService<SessionData>;
    };
    product: {
        key: string;
    };
    secrets: {
        cookie: string;
    };
}

passport.serializeUser<Express.User>((user, done) => {
    done(null, user);
});

passport.deserializeUser<Express.User>((user, done) => {
    done(null, user);
});

const withPassportAuth = async ({
    app,
    services,
    product,
    secrets
}: WithPassportAuth) => {
    const store = new AuthSessionStore(services.authSession);

    app.use(
        json(),
        urlencoded({ extended: true }),
        session({
            genid: () => uid(32),
            name: `labset_${product.key}`,
            secret: secrets.cookie,
            store,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true, sameSite: 'none' }
        })
    );
};

export { withPassportAuth };
