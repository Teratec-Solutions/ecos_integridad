"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
/* import authMiddleware from '../middlewares/auth.middleware' */
const permission_middleware_1 = require("../middlewares/permission.middleware");
const organizations_controller_1 = require("../controllers/organizations.controller");
const validation_middleware_1 = (0, tslib_1.__importDefault)(require("../middlewares/validation.middleware"));
const organizations_dto_1 = require("../dtos/organizations.dto");
class OrganizationsRoute {
    constructor() {
        this.path = '/organizations';
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/createOrg`, 
        /* authMiddleware, */
        (0, permission_middleware_1.grantAccess)('createAny', 'OrganizationPermission'), (0, validation_middleware_1.default)(organizations_dto_1.CreateOrgDto, 'body', true), organizations_controller_1.createOrg);
        this.router.put(`${this.path}/update/organization/:organizationId`, 
        /* authMiddleware, */
        (0, permission_middleware_1.grantAccess)('updateAny', 'OrganizationPermission'), (0, validation_middleware_1.default)(organizations_dto_1.UpdateOrgDto, 'body', true), organizations_controller_1.updateOrganization);
        this.router.get(`${this.path}/getOrganizations`, /* authMiddleware, */ (0, permission_middleware_1.superAdminAccess)(), organizations_controller_1.getAllOrgs);
        this.router.get(`${this.path}/getMyOrganizations`, /* authMiddleware, */ organizations_controller_1.getMyOrgs);
        this.router.delete(`${this.path}/delete/organization/:organizationId`, 
        /* authMiddleware, */
        (0, permission_middleware_1.superAdminAccess)(), organizations_controller_1.deleteOrganization);
    }
}
exports.default = OrganizationsRoute;
//# sourceMappingURL=organizations.route.js.map