import { Router } from 'express';
import { body } from 'express-validator';
import { authLimiter } from '../middleware/rateLimiter.js';
import { login, register, refresh } from '../controllers/auth.controller.js';

const router = Router();

router.post(
  '/register',
  authLimiter,
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').isString().isLength({ min: 2 }),
  body('role').optional().isIn(['user', 'provider', 'admin']),
  register
);

router.post(
  '/login',
  authLimiter,
  body('email').isEmail(),
  body('password').isString(),
  login
);

router.post('/refresh', authLimiter, refresh);

export default router;

