"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const roles_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/roles.controller"));
const router = (0, express_1.Router)();
router.use('/getRoles', roles_controller_1.default.getAllRoles);
exports.default = router;
//# sourceMappingURL=roles.route.js.map