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
const getNumberWorkOrders = async (req, res, next) => {
    try {
        const total = await wo_service_1.default.getNumberWorkOrders();
        res.status(201).json({ data: { total: total }, message: 'total de ordenes' });
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
const editWorkOrder = async (req, res, next) => {
    const orden = req.body;
    try {
        const response = await wo_service_1.default.editWorkOrder(orden);
        res.status(201).json({ data: response, message: 'orden editada' });
    }
    catch (error) {
        next(error);
    }
};
const deleteWorkOrder = async (req, res, next) => {
    console.log(req.body._id);
    try {
        const response = await wo_service_1.default.deleteWorkOrder(req.body._id);
        res.status(201).json({ message: 'orden elimnada' });
    }
    catch (error) {
    }
};
const getWoById = async (req, res, next) => {
    const ordenId = req.body.orderId;
    console.log(ordenId);
    try {
        const response = await wo_service_1.default.getWoById(ordenId);
        res.status(201).json({ data: response, message: 'orden enviada' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getWorkOrders,
    getNumberWorkOrders,
    createWorkOrder,
    editWorkOrder,
    deleteWorkOrder,
    getWoById
};
//# sourceMappingURL=wo.controller.js.map