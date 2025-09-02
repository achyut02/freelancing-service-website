import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Not Found' });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status = (err as any).status || 500;
  const message = (err as any).message || 'Internal Server Error';
  res.status(status).json({ message });
}

