import { DocEntity } from '@labset/platform-base-backend-db';

interface AuthSession<TPayload> extends DocEntity {
    expiresAt: Date;
    payload: TPayload;
}

export type { AuthSession };
