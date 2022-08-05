"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminAccess = exports.grantAccess = void 0;
const tslib_1 = require("tslib");
const accessControl_service_1 = (0, tslib_1.__importDefault)(require("../services/accessControl.service"));
const HttpException_1 = require("../exceptions/HttpException");
const roles_model_1 = (0, tslib_1.__importDefault)(require("../models/roles.model"));
const roles_config_1 = require("../configs/roles.config");
const grantAccess = function (action = null, resource = null) {
    return async (req, res, next) => {
        if (!Array.isArray(req.user.roles) || !req.user.roles.length) {
            return next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
        }
        const globalRoleFound = req.user.roles.find(role => {
            return !role.organizationId;
        });
        if (globalRoleFound && globalRoleFound.name === roles_config_1.superAdmin.name) {
            next();
            req.role = globalRoleFound;
            return;
        }
        if (globalRoleFound) {
            const permission = accessControl_service_1.default.check(globalRoleFound._id, resource, action);
            if (permission.granted) {
                req.role = globalRoleFound;
                return next();
            }
        }
        try {
            let org = req.params.organizationId;
            if (!org) {
                const roleId = req.params.roleId || req.body._id;
                if (roleId) {
                    const findRoleData = await roles_model_1.default.findById(roleId);
                    org = findRoleData.organizationId.toString();
                }
            }
            const roleFound = req.user.roles.find(obj => {
                if (obj.organizationId && org === obj.organizationId.toString()) {
                    return obj.organizationId;
                }
                else
                    return null;
            });
            if (roleFound) {
                const permission = accessControl_service_1.default.check(roleFound._id, resource, action);
                if (!permission.granted) {
                    return next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
                }
            }
            else {
                return next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
            }
            req.role = roleFound;
            return next();
        }
        catch (_a) {
            return next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
        }
    };
};
exports.grantAccess = grantAccess;
const superAdminAccess = function () {
    return async (req, res, next) => {
        if (!Array.isArray(req.user.roles) || !req.user.roles.length)
            next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
        try {
            const superAdminFound = req.user.roles.find(role => {
                return role.name === roles_config_1.superAdmin.name && !role.organizationId;
            });
            if (superAdminFound) {
                next();
                req.role = superAdminFound;
                return;
            }
            else {
                return next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
            }
        }
        catch (error) {
            return next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
        }
    };
};
exports.superAdminAccess = superAdminAccess;
//# sourceMappingURL=permission.middleware.js.map