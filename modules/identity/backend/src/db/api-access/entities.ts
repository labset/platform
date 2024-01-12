import { DocEntity } from '@labset/platform-core-backend';

interface AuthSession<TPayload> extends DocEntity {
    expiresAt: Date;
    payload: TPayload;
}

export type { AuthSession };
