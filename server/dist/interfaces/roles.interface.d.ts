import { ObjectId } from 'mongoose';
export interface Organization {
    _id: ObjectId;
    name: string;
}
export interface Role {
    _id: ObjectId;
    name: string;
    description?: string;
    organizationId?: ObjectId;
}
export interface RoleId {
    _id: ObjectId;
}
