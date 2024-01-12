import { randomUUID } from 'crypto';

import express from 'express';
import { SessionData } from 'express-session';
import { DateTime } from 'luxon';

import type { IAuthSessionService } from '../../services';

import { AuthSessionStore } from './auth-session-store';

describe('auth-session-store', () => {
    let store: AuthSessionStore;
    let service: IAuthSessionService<SessionData>;

    beforeAll(() => {
        service = {
            getSession: jest.fn().mockResolvedValue({}),
            removeSession: jest.fn().mockResolvedValue({}),
            setSession: jest.fn().mockResolvedValue({})
        };
        store = new AuthSessionStore(service);
    });

    it('should set, get, then destroy a session', () => {
        const expiresAt = DateTime.now().plus({ hour: 2 });
        const sessionId = randomUUID();
        const sessionData: SessionData = {
            id: sessionId,
            authToken: randomUUID(),
            claimToken: randomUUID(),
            cookie: {
                originalMaxAge: null,
                expires: expiresAt.toJSDate()
            },
            expiresAt: expiresAt.toJSDate()
        };
        store.set(sessionId, sessionData);
        expect(service.setSession).toHaveBeenCalledWith(
            sessionId,
            expiresAt.toJSDate(),
            sessionData
        );

        store.get(sessionId, jest.fn());
        expect(service.getSession).toHaveBeenCalledWith(sessionId);

        store.destroy(sessionId, jest.fn());
        expect(service.removeSession).toHaveBeenCalledWith(sessionId);
    });
});
