import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';

export async function register(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password, name, role } = req.body as { email: string; password: string; name: string; role?: string };
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already in use' });
  const user = await User.create({ email, password, name, role });
  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id, role: user.role });
  res.status(201).json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, accessToken, refreshToken });
}

export async function login(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id, role: user.role });
  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, accessToken, refreshToken });
}

export async function refresh(req: Request, res: Response) {
  // Placeholder, implement refresh token verification storage/rotation later
  return res.status(501).json({ message: 'Not implemented' });
}

