import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
declare const grantAccess: (action?: string, resource?: string) => (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
declare const superAdminAccess: () => (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export { grantAccess, superAdminAccess };
