import cors from 'cors';
import { Express } from 'express';

interface WithCors {
    app: Express;
    product: {
        key: string;
        baseUrl: string;
    };
}

const withCors = ({ app, product }: WithCors) => {
    app.options(
        `/gateway/${product.key}/*`,
        cors<cors.CorsRequest>({ origin: [product.baseUrl], credentials: true })
    );
    app.use(
        `/gateway/${product.key}/*`,
        cors<cors.CorsRequest>({ origin: [product.baseUrl], credentials: true })
    );
};

export { withCors };
