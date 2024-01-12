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
    authSessionService: IAuthSessionService<SessionData>;
    cookieSecret: string;
    productKey: string;
}

passport.serializeUser<Express.User>((user, done) => {
    done(null, user);
});

passport.deserializeUser<Express.User>((user, done) => {
    done(null, user);
});

const withPassportAuth = async ({
    app,
    authSessionService,
    cookieSecret,
    productKey
}: WithPassportAuth) => {
    const store = new AuthSessionStore(authSessionService);

    app.use(
        json(),
        urlencoded({ extended: true }),
        session({
            genid: () => uid(32),
            name: `labset_${productKey}`,
            secret: cookieSecret,
            store,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true, sameSite: 'none' }
        })
    );
};

export { withPassportAuth };
