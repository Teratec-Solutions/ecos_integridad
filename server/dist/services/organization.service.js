"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrgById = exports.getOrganizations = exports.deleteOrgById = exports.createOrganization = void 0;
const tslib_1 = require("tslib");
const i18n_1 = require("i18n");
const configs_1 = require("../configs");
const organizations_model_1 = (0, tslib_1.__importDefault)(require("../models/organizations.model"));
const HttpException_1 = require("../exceptions/HttpException");
const createOrganization = async (orgInfo, locale = configs_1.env.locale) => {
    const newOrganization = organizations_model_1.default.create(orgInfo);
    if (!newOrganization)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Organization {{name}} already exists', locale }, { name: orgInfo.name }));
    return newOrganization;
};
exports.createOrganization = createOrganization;
const deleteOrgById = async (organizationId, locale = configs_1.env.locale) => {
    const deleted = await organizations_model_1.default.findByIdAndDelete(organizationId);
    if (!deleted)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'Oganization not found', locale }));
    return deleted;
};
exports.deleteOrgById = deleteOrgById;
const getOrganizations = async () => {
    const organizations = await organizations_model_1.default.find();
    return organizations;
};
exports.getOrganizations = getOrganizations;
const updateOrgById = async (organizationId, organizationData, locale = configs_1.env.locale) => {
    const updated = await organizations_model_1.default.findByIdAndUpdate(organizationId, organizationData, { new: true });
    if (!updated)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'Oganization not found', locale }));
    return updated;
};
exports.updateOrgById = updateOrgById;
//# sourceMappingURL=organization.service.js.map