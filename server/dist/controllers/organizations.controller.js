"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyOrgs = exports.deleteOrganization = exports.updateOrganization = exports.getAllOrgs = exports.createOrg = void 0;
const organization_service_1 = require("../services/organization.service");
const createOrg = async (req, res, next) => {
    try {
        const orgInfo = req.body;
        const newOrganization = await (0, organization_service_1.createOrganization)(orgInfo);
        res.status(201).json({ data: newOrganization, message: 'created' });
    }
    catch (error) {
        next(error);
    }
};
exports.createOrg = createOrg;
const getAllOrgs = async (req, res, next) => {
    try {
        const findAllOrgs = await (0, organization_service_1.getOrganizations)();
        res.status(200).json({ data: findAllOrgs, message: 'findOrganizations' });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOrgs = getAllOrgs;
const getMyOrgs = async (req, res, next) => {
    try {
        let findAllOrgs = req.user.roles.map(role => {
            if (role.organizationId) {
                return role.organizationId;
            }
            else
                return null;
        });
        findAllOrgs = findAllOrgs.filter(organization => organization); // remove null from array
        res.status(200).json({ data: findAllOrgs, message: 'findOrganizations' });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyOrgs = getMyOrgs;
const updateOrganization = async (req, res, next) => {
    try {
        const organizationId = req.params.organizationId;
        const organizationData = req.body;
        const updatedOrganization = await (0, organization_service_1.updateOrgById)(organizationId, organizationData);
        res.status(200).json({ data: updatedOrganization, message: 'updated' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrganization = updateOrganization;
const deleteOrganization = async (req, res, next) => {
    try {
        const organizationId = req.params.organizationId;
        const deletedOrg = await (0, organization_service_1.deleteOrgById)(organizationId);
        res.status(200).json({ data: deletedOrg, message: 'deleted' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOrganization = deleteOrganization;
//# sourceMappingURL=organizations.controller.js.map