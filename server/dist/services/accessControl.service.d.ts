/// <reference types="mongoose" />
import { AccessControl } from 'accesscontrol';
import { User } from '../interfaces/users.interface';
declare const _default: {
    ac: AccessControl;
    check: (role: import("mongoose").Schema.Types.ObjectId, resource: string, type: string) => any;
    createSuperAdmin: () => Promise<User>;
    initAccessControl: () => Promise<void>;
    updateAccessControl: () => Promise<string>;
};
export default _default;
