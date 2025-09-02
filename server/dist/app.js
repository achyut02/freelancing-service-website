import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { env } from './config/env.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
export function createApp() {
    const app = express();
    app.set('trust proxy', 1);
    app.use(helmet());
    app.use(cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, curl) or same-origin
            if (!origin)
                return callback(null, true);
            if (env.clientOrigins.includes(origin))
                return callback(null, true);
            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.options('*', cors());
    app.use(morgan('dev'));
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use('/api', apiLimiter, routes);
    app.use(notFound);
    app.use(errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map