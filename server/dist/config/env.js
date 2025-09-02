import dotenv from 'dotenv';
dotenv.config();
const rawOrigins = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const clientOrigins = rawOrigins
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
export const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '5000', 10),
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/service_platform',
    clientOrigins,
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'dev-access-secret',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
    },
    cookie: {
        domain: process.env.COOKIE_DOMAIN,
        secure: (process.env.COOKIE_SECURE || 'false') === 'true',
    },
};
export const isProd = env.nodeEnv === 'production';
//# sourceMappingURL=env.js.map