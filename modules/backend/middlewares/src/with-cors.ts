import cors from 'cors';
import { Express } from 'express';

interface WithCors {
    app: Express;
    product: {
        gatewayUrl: string;
        baseUrl: string;
    };
}

const withCors = ({ app, product }: WithCors) => {
    app.options(
        `${product.gatewayUrl}/*`,
        cors<cors.CorsRequest>({ origin: [product.baseUrl], credentials: true })
    );
    app.use(
        `${product.gatewayUrl}/*`,
        cors<cors.CorsRequest>({ origin: [product.baseUrl], credentials: true })
    );
};

export { withCors };
