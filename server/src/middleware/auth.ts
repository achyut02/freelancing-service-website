import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type AuthRole = 'user' | 'provider' | 'admin';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: AuthRole };
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.substring(7) : undefined;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, env.jwt.accessSecret) as { sub: string; role: AuthRole };
    req.user = { id: decoded.sub, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function authorize(roles: AuthRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}

