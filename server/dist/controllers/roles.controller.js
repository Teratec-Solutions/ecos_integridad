"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const accessControl_service_1 = (0, tslib_1.__importDefault)(require("../services/accessControl.service"));
/*const createRole = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
         const rolesMatchs = Object.keys(req.body.resources).every(key => {
            return Object.keys(req.role.resources).includes(key)
        })

        const roleInfo: CreateRoleDto = req.body
        const newRole = await AccessControlServices.createRole(roleInfo, req.params.organizationId, rolesMatchs)
        res.status(201).json({ data: newRole, message: 'created' })
    } catch (error) {
        next(error)
    }
}*/
/* const createGlobalRole = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const rolesMatchs = Object.keys(req.body.resources).every(key => {
            return Object.keys(req.role.resources).includes(key)
        })

        const roleInfo: CreateRoleDto = req.body
        const newRole = await AccessControlServices.createGlobalRole(roleInfo, rolesMatchs)
        res.status(201).json({ data: newRole, message: 'created' })
    } catch (error) {
        next(error)
    }
} */
/* const getRolesByOrg = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const orgIdObj = require('mongodb').ObjectId(req.params.organizationId)
        const findAllRoles: Role[] = await AccessControlServices.findRolesByOrg(orgIdObj)
        res.status(200).json({ data: findAllRoles, message: 'findRoles' })
    } catch (error) {
        next(error)
    }
} */
const getAllRoles = async (req, res, next) => {
    try {
        const findAllRoles = await accessControl_service_1.default.findAllRoles();
        console.log(findAllRoles);
        res.status(200).json({ data: findAllRoles, message: 'findRoles' });
    }
    catch (error) {
        next(error);
    }
};
const getMyRoles = async (req, res, next) => {
    try {
        const findMyRoles = req.user.roles;
        res.status(200).json({ data: findMyRoles, message: 'findRoles' });
    }
    catch (error) {
        next(error);
    }
};
const updateRole = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;
        const roleData = req.body;
        const updatedRole = await accessControl_service_1.default.updateRoleById(roleId, roleData);
        res.status(200).json({ data: updatedRole, message: 'updated' });
    }
    catch (error) {
        next(error);
    }
};
const deleteRole = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;
        const deletedRole = await accessControl_service_1.default.deleteRole(roleId);
        res.status(200).json({ data: deletedRole, message: 'deleted' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = { /* createRole, getRolesByOrg,  */ getAllRoles, updateRole, deleteRole /* , createGlobalRole */, getMyRoles };
//# sourceMappingURL=roles.controller.js.map