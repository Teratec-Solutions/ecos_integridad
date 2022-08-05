import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
declare const _default: {
    getAllRoles: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    updateRole: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    deleteRole: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    getMyRoles: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
};
export default _default;
