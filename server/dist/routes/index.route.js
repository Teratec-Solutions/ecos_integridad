"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_route_1 = (0, tslib_1.__importDefault)(require("./auth.route"));
const users_route_1 = (0, tslib_1.__importDefault)(require("./users.route"));
const clients_route_1 = (0, tslib_1.__importDefault)(require("./clients.route"));
const wo_route_1 = (0, tslib_1.__importDefault)(require("./wo.route"));
const contratos_route_1 = (0, tslib_1.__importDefault)(require("./contratos.route"));
const template_route_1 = (0, tslib_1.__importDefault)(require("./template.route"));
const router = (0, express_1.Router)();
router.use('/api', auth_route_1.default);
router.use('/api/users', users_route_1.default);
router.use('/api/clients', clients_route_1.default);
router.use('/api/orders', wo_route_1.default);
router.use('/api/contratos', contratos_route_1.default);
router.use('/api/templates', template_route_1.default);
exports.default = router;
//# sourceMappingURL=index.route.js.map