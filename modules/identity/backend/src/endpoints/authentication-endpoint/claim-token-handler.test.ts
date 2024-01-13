import express, { Express } from 'express';
import request from 'supertest';

import { claimTokenHandler } from './claim-token-handler';

describe('claim-token-handler', () => {
    let app: Express;
    beforeAll(() => {
        app = express();
        app.post(
            `/test/claim`,
            claimTokenHandler({
                product: { key: 'test', baseUrl: '', gatewayUrl: '' }
            })
        );
    });

    it('should return 401 when no session', async () => {
        const response = await request(app).post(`/test/claim`);
        expect(response.statusCode).toEqual(401);
    });
});
