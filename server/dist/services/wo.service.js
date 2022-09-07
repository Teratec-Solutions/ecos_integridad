"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const wo_model_1 = (0, tslib_1.__importDefault)(require("../models/wo.model"));
const workOrder = wo_model_1.default;
const getWorkOrders = async () => {
    const ordenes = await workOrder.find();
    return ordenes;
};
const createWorkOrder = async (orden) => {
    const wo = await workOrder.create(Object.assign({}, orden));
    return wo;
};
exports.default = {
    getWorkOrders,
    createWorkOrder
};
//# sourceMappingURL=wo.service.js.map