import type { Request, Response, NextFunction } from 'express';
export type AuthRole = 'user' | 'provider' | 'admin';
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        role: AuthRole;
    };
}
export declare function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function authorize(roles: AuthRole[]): (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map