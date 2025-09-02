import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

export type JwtPayload = {
  sub: string;
  role: 'user' | 'provider' | 'admin';
};

export function signAccessToken(payload: JwtPayload): string {
  const secret: Secret = env.jwt.accessSecret as unknown as Secret;
  const options: SignOptions = { expiresIn: env.jwt.accessExpiresIn as unknown as any };
  return (jwt.sign as unknown as (p: any, s: Secret, o: SignOptions) => string)(payload, secret, options);
}

export function signRefreshToken(payload: JwtPayload): string {
  const secret: Secret = env.jwt.refreshSecret as unknown as Secret;
  const options: SignOptions = { expiresIn: env.jwt.refreshExpiresIn as unknown as any };
  return (jwt.sign as unknown as (p: any, s: Secret, o: SignOptions) => string)(payload, secret, options);
}

export function verifyAccessToken(token: string): JwtPayload {
  const secret: Secret = env.jwt.accessSecret as unknown as Secret;
  return jwt.verify(token, secret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  const secret: Secret = env.jwt.refreshSecret as unknown as Secret;
  return jwt.verify(token, secret) as JwtPayload;
}

