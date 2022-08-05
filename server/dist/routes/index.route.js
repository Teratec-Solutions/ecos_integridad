"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_route_1 = (0, tslib_1.__importDefault)(require("./auth.route"));
const users_route_1 = (0, tslib_1.__importDefault)(require("./users.route"));
const router = (0, express_1.Router)();
router.use('/api', auth_route_1.default);
router.use('/api/users', users_route_1.default);
exports.default = router;
//# sourceMappingURL=index.route.js.map