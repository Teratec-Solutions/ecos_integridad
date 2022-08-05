"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const accesscontrol_1 = require("accesscontrol");
const bcrypt_1 = (0, tslib_1.__importDefault)(require("bcrypt"));
const users_model_1 = (0, tslib_1.__importDefault)(require("../models/users.model"));
const util_1 = require("../utils/util");
const users_service_1 = (0, tslib_1.__importDefault)(require("./users.service"));
const ac = new accesscontrol_1.AccessControl();
const initAccessControl = async () => {
    const findSuperAdmin = await users_model_1.default.findOne({ role: 'superAdmin' });
    if (!findSuperAdmin) {
        const userData = {
            nombre: process.env.NOMBRE,
            apellido1: process.env.APELLIDO1,
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
            role: process.env.ROLE,
        };
        const res = await users_service_1.default.createUser(userData);
        if (res) {
            console.log('Super Usuario Creado');
        }
    }
    else {
        console.log('Super Usuario Existente');
    }
};
const updateAccessControl = async () => {
    const parsedRoles = {};
    ac.setGrants(parsedRoles);
    return 'Access Control updated';
};
/**
 * Function to check permissions of a role against the Access Control.
 * @param {*} role Id of the role in DB
 * @param {*} resource Name of the resource given by mongoose collection
 * @param {*} type Type of action over the resource (e.g. createAny or createOwn)
 * @returns AccessControl~Permission, defines the granted or denied access permissions to the target resource and role
 */
const check = (role, resource, type) => {
    const typeResponses = {
        createAny: ac.can(role.toString()).createAny(resource),
        readAny: ac.can(role.toString()).readAny(resource),
        updateAny: ac.can(role.toString()).updateAny(resource),
        deleteAny: ac.can(role.toString()).deleteAny(resource),
        createOwn: ac.can(role.toString()).createOwn(resource),
        readOwn: ac.can(role.toString()).readOwn(resource),
        updateOwn: ac.can(role.toString()).updateOwn(resource),
        deleteOwn: ac.can(role.toString()).deleteOwn(resource)
    };
    if (!Object.keys(typeResponses).includes(type))
        return ac.can(role.toString()).readAny('NONRESOURCE');
    return typeResponses[type];
};
const createSuperAdmin = async () => {
    const hashedPassword = await bcrypt_1.default.hash(process.env.PASSWORD, 10);
    const user = await users_model_1.default.findOneAndUpdate({ email: process.env.EMAIL }, {
        $setOnInsert: Object.assign(Object.assign({ nombre: process.env.NOMBRE }, (!(0, util_1.isEmpty)(process.env.APELLIDO1) && { apellido1: process.env.APELLIDO1 })), { email: process.env.EMAIL, password: hashedPassword })
    }, { new: true, upsert: true });
    return user;
};
exports.default = {
    ac,
    check,
    createSuperAdmin,
    initAccessControl,
    updateAccessControl,
};
//# sourceMappingURL=accessControl.service.js.map