"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.superAdmin = exports.user = exports.admin = void 0;
const superAdmin = {
    name: 'superAdmin',
    /* resources: {
        User: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        RolePermission: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        OrganizationPermission: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    }, */
    description: ''
};
exports.superAdmin = superAdmin;
const admin = {
    name: 'admin',
    description: ''
    /*adminRole: {
        name: 'admin',
        description: ''
         resources: {
            User: {
                'create:any': ['*'],
                'read:any': ['*'],
                'update:any': ['*'],
                'delete:any': ['*']
            },
            RolePermission: {
                'create:any': ['*'],
                'read:any': ['*'],
                'update:any': ['*'],
                'delete:any': ['*']
            }
        }
    }*/
};
exports.admin = admin;
const user = {
    name: 'user',
    /* resources: {
        User: {
            'create:own': ['*'],
            'read:any': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        RolePermission: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        OrganizationPermission: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        }
    }, */
    description: ''
};
exports.user = user;
const client = {
    name: 'client',
    /* resources: {
        User: {
            'create:own': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:own': ['*']
        },
        RolePermission: {
            'create:own': ['*'],
            'read:any': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        OrganizationPermission: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        }
    }, */
    description: ''
};
exports.client = client;
//# sourceMappingURL=roles.config.js.map