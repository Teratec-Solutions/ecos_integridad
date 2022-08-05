import { RequestWithUser } from '../interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';
declare const createOrg: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getAllOrgs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getMyOrgs: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
declare const updateOrganization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteOrganization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createOrg, getAllOrgs, updateOrganization, deleteOrganization, getMyOrgs };
