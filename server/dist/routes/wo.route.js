"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const wo_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/wo.controller"));
const auth_middleware_1 = (0, tslib_1.__importDefault)(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post(`/saveOrder`, auth_middleware_1.default, wo_controller_1.default.createWorkOrder);
router.post(`/editOrder`, auth_middleware_1.default, wo_controller_1.default.createWorkOrder);
router.get(`/getWorkOrders`, auth_middleware_1.default, wo_controller_1.default.getWorkOrders);
router.get(`/getNumberWorkOrders`, auth_middleware_1.default, wo_controller_1.default.getNumberWorkOrders);
router.post(`/deleteWorkOrder`, auth_middleware_1.default, wo_controller_1.default.deleteWorkOrder);
exports.default = router;
//# sourceMappingURL=wo.route.js.map