"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = (0, tslib_1.__importDefault)(require("../middlewares/auth.middleware"));
const contrato_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/contrato.controller"));
const router = (0, express_1.Router)();
router.post(`/guardarContrato`, auth_middleware_1.default, contrato_controller_1.default.guardarContrato);
exports.default = router;
//# sourceMappingURL=contratos.route.js.map