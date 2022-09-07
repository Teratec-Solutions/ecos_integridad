"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const clients_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/clients.controller"));
const auth_middleware_1 = (0, tslib_1.__importDefault)(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post(`/createClient`, auth_middleware_1.default, clients_controller_1.default.createClient);
router.post(`/editClient`, auth_middleware_1.default, clients_controller_1.default.editClient);
router.post(`/getClientById`, auth_middleware_1.default, clients_controller_1.default.getClientById);
router.post(`/deleteClient`, auth_middleware_1.default, clients_controller_1.default.deleteClient);
router.get(`/getClients`, auth_middleware_1.default, clients_controller_1.default.getClients);
exports.default = router;
//# sourceMappingURL=clients.route.js.map