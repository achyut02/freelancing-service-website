import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
export function authenticate(req, res, next) {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.substring(7) : undefined;
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, env.jwt.accessSecret);
        req.user = { id: decoded.sub, role: decoded.role };
        next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
export function authorize(roles) {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ message: 'Unauthorized' });
        if (!roles.includes(req.user.role))
            return res.status(403).json({ message: 'Forbidden' });
        next();
    };
}
//# sourceMappingURL=auth.js.map