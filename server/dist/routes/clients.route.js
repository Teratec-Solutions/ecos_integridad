"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const users_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/users.controller"));
const auth_middleware_1 = (0, tslib_1.__importDefault)(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post(`/createClient`, auth_middleware_1.default, users_controller_1.default.createUser);
router.post(`/editClient`, auth_middleware_1.default, users_controller_1.default.editUser);
router.post(`/getClientById`, auth_middleware_1.default, users_controller_1.default.getUserById);
router.post(`/deleteClient`, auth_middleware_1.default, users_controller_1.default.deleteUser);
router.get(`/getClient`, auth_middleware_1.default, users_controller_1.default.getUsers);
exports.default = router;
//# sourceMappingURL=clients.route.js.map