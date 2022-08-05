/// <reference types="mongoose" />
import { CreateOrgDto } from '../dtos/organizations.dto';
declare const createOrganization: (orgInfo: CreateOrgDto, locale?: string) => Promise<import("mongoose").Document<any, any, any>>;
declare const deleteOrgById: (organizationId: string, locale?: string) => Promise<any>;
declare const getOrganizations: () => Promise<any>;
declare const updateOrgById: (organizationId: string, organizationData: object, locale?: string) => Promise<any>;
export { createOrganization, deleteOrgById, getOrganizations, updateOrgById };
