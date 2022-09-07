"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const wo_service_1 = (0, tslib_1.__importDefault)(require("../services/wo.service"));
const getWorkOrders = async (req, res, next) => {
    try {
        const response = await wo_service_1.default.getWorkOrders();
        res.status(201).json({ data: response, message: 'lista de ordenes' });
    }
    catch (error) {
        next(error);
    }
};
const createWorkOrder = async (req, res, next) => {
    const orden = req.body;
    try {
        const response = await wo_service_1.default.createWorkOrder(orden);
        res.status(201).json({ data: response, message: 'orden creada' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getWorkOrders,
    createWorkOrder
};
//# sourceMappingURL=wo.controller.js.map