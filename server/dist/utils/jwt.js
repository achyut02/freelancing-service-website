import jwt, {} from 'jsonwebtoken';
import { env } from '../config/env.js';
export function signAccessToken(payload) {
    const secret = env.jwt.accessSecret;
    const options = { expiresIn: env.jwt.accessExpiresIn };
    return jwt.sign(payload, secret, options);
}
export function signRefreshToken(payload) {
    const secret = env.jwt.refreshSecret;
    const options = { expiresIn: env.jwt.refreshExpiresIn };
    return jwt.sign(payload, secret, options);
}
export function verifyAccessToken(token) {
    const secret = env.jwt.accessSecret;
    return jwt.verify(token, secret);
}
export function verifyRefreshToken(token) {
    const secret = env.jwt.refreshSecret;
    return jwt.verify(token, secret);
}
//# sourceMappingURL=jwt.js.map